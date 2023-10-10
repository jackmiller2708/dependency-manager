import { WorkspaceHistoryEndpoint } from "@models/app-endpoint.model";
import { WorkspaceHistoryService } from "./workspace-history.service";
import { AppHandlerOptions } from "@models/app-handler.model";
import { WorkspaceHistory } from "@models/workspace-history.model";
import { IAppController } from "@interfaces/app-controller.interface";
import { Controller } from "@decorators/controller.decorator";
import { Workspace } from "@models/workspace.model";
import { Handler } from "@decorators/handler.decorator";

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
  setLastOpened(workspace: Workspace) {
    console.dir(workspace)
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

}
