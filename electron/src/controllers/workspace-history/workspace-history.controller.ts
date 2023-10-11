import { WorkspaceHistoryEndpoint } from "@models/app-endpoint.model";
import { WorkspaceHistoryService } from "./workspace-history.service";
import { BrowserWindow, dialog } from "electron";
import { AppHandlerOptions } from "@models/app-handler.model";
import { WorkspaceHistory } from "@models/workspace-history.model";
import { IAppController } from "@interfaces/app-controller.interface";
import { Controller } from "@decorators/controller.decorator";
import { AppService } from "@services/app/app.service";
import { Workspace } from "@models/workspace.model";
import { basename } from "path";
import { Handler } from "@decorators/handler.decorator";
import { Either } from "@models/monads/either.model";

const workspaceHandlerOptions = new AppHandlerOptions({ adaptor: Workspace.adaptor });

@Controller('workspace-history')
export class WorkspaceHistoryController implements IAppController {
  private readonly _service: WorkspaceHistoryService;

  constructor() {
    this._service = new WorkspaceHistoryService();
  }

  @Handler(WorkspaceHistoryEndpoint.LOAD)
  loadHistory(): string {
    const unwrap = (history: WorkspaceHistory): WorkspaceHistory => history;

    return JSON.stringify(this._service.getData().fold(unwrap, unwrap));
  }

  @Handler(WorkspaceHistoryEndpoint.SET_LAST_OPENED, workspaceHandlerOptions)
  async setLastOpened(workspace?: Workspace) {
   const input = workspace
     ? this._service.updateAndPersistData((history: WorkspaceHistory): Either<WorkspaceHistory, WorkspaceHistory> => {
          return Either.right<WorkspaceHistory, WorkspaceHistory>(history.setLastOpened(workspace));
        })
     : await this._openWorkspaceSelectDialog();

    return input?.fold(
      (err) => err,
      (history) => history
    );
  }

  @Handler(WorkspaceHistoryEndpoint.UNSET_LAST_OPENED, workspaceHandlerOptions)
  unsetLastOpened(workspace: Workspace) {
    console.dir(workspace)
  }

  @Handler(WorkspaceHistoryEndpoint.ADD_TO_HISTORY, workspaceHandlerOptions)
  addToHistory(workspace: Workspace) {
    console.dir(workspace)
  }

  @Handler(WorkspaceHistoryEndpoint.UPDATE_FROM_HISTORY, workspaceHandlerOptions)
  updateFromHistory(workspace: Workspace) {
    console.dir(workspace)
  }

  @Handler(WorkspaceHistoryEndpoint.REMOVE_FROM_HISTORY, workspaceHandlerOptions)
  removeFromHistory(workspace: Workspace) {
    console.dir(workspace)
  }

  private async _openWorkspaceSelectDialog(): Promise<Either<Error, WorkspaceHistory> | undefined> {
    const result = await dialog.showOpenDialog(
      AppService.window as BrowserWindow,
      { properties: ["openDirectory"] }
    );

    if (!result.canceled && result.filePaths.length > 0) {
      const workspacePath = result.filePaths[0];

      return Workspace.isPathValid(workspacePath)
        ? (this._service.updateAndPersistData((history: WorkspaceHistory) => {
            return Either.right<WorkspaceHistory, WorkspaceHistory>(
              history.addWorkspace(
                new Workspace({
                  path: workspacePath,
                  name: basename(workspacePath),
                  timestamp: Date.now(),
                })
              )
            );
          }) as unknown as Either<Error, WorkspaceHistory>)
        : Either.left(new Error("Invalid Workspace"));
    }
  }
}
