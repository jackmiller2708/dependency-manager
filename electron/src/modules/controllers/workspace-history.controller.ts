import { IpcMain, IpcMainInvokeEvent } from "electron";
import { WorkspaceHistoryEndpoint } from "@models/app-endpoint.model";
import { IAppController } from "@interfaces/app-controller.interface";

export class WorkspaceHistoryController implements IAppController {
  constructor(private readonly _IPC: IpcMain) {}

  register(): void {
    this._registerHandler(WorkspaceHistoryEndpoint.LOAD, this._loadHistory);
  }

  private _loadHistory(): string {
    return "history loaded";
  }

  private _registerHandler<P, T>(endpoint: string, handler: (event: IpcMainInvokeEvent, args?: P) => T): void {
    this._IPC.handle(endpoint, handler.bind(this));
  }
}
