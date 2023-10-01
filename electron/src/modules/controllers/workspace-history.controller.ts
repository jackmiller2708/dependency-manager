import { WorkspaceHistoryEndpoint } from "../../shared/models/app-endpoint.model";
import { IpcMain } from "electron";

export class WorkspaceHistoryController {
  constructor(private readonly _IPC: IpcMain) {}

  register(): void {
    this._registerHandler(WorkspaceHistoryEndpoint.LOAD, this._loadHistory);
  }

  private _loadHistory(): string {
    return "history loaded"
  }

  private _registerHandler<P, T>(endpoint: string, handler: (args?: P) => T): void {
    this._IPC.handle(endpoint, handler.bind(this));
  }
}
