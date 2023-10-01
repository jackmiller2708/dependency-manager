import { WorkspaceHistoryController } from "./workspace-history.controller";
import { ipcMain } from "electron";

export function registerControllers(): void {
  new WorkspaceHistoryController(ipcMain).register();
}
