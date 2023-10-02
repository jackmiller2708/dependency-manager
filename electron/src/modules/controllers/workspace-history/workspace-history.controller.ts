import { IpcMain, IpcMainInvokeEvent } from "electron";
import { WorkspaceHistoryEndpoint } from "@models/app-endpoint.model";
import { WorkspaceHistoryService } from "./workspace-history.service";
import { WorkspaceHistory } from "@models/workspace-history.model";
import { IAppController } from "@interfaces/app-controller.interface";

export class WorkspaceHistoryController implements IAppController {
  private readonly _service: WorkspaceHistoryService;

  constructor(private readonly _IPC: IpcMain) {
    this._service = new WorkspaceHistoryService();
  }

  register(): void {
    this._registerHandler(WorkspaceHistoryEndpoint.LOAD, this._loadHistory);
  }

  private _loadHistory(): string {
    const unwrap = (history: WorkspaceHistory): WorkspaceHistory => history;

    return JSON.stringify(this._service.getData().fold(unwrap, unwrap));
  }

  private _registerHandler<P = void, T = unknown>(endpoint: string, handler: (args: P) => T): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _internalHandler = (_: IpcMainInvokeEvent, ..._args: any[]) => handler.apply(this, _args[0]);

    this._IPC.handle(endpoint, _internalHandler);
  }
}
