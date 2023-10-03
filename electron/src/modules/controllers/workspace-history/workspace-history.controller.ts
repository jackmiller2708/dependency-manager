import { WorkspaceHistoryEndpoint } from "@models/app-endpoint.model";
import { WorkspaceHistoryService } from "./workspace-history.service";
import { makeHandlerRegistrar } from "..";
import { WorkspaceHistory } from "@models/workspace-history.model";
import { IAppController } from "@interfaces/app-controller.interface";
import { IpcMain } from "electron";

export class WorkspaceHistoryController implements IAppController {
  private readonly _service: WorkspaceHistoryService;

  constructor(private readonly _IPC: IpcMain) {
    this._service = new WorkspaceHistoryService();
  }

  register(): void {
    const _registerHandler = makeHandlerRegistrar(this, this._IPC);

    _registerHandler(WorkspaceHistoryEndpoint.LOAD, this._loadHistory);
  }

  private _loadHistory(): string {
    const unwrap = (history: WorkspaceHistory): WorkspaceHistory => history;

    return JSON.stringify(this._service.getData().fold(unwrap, unwrap));
  }
}
