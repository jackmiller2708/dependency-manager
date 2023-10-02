import { IAppController } from "@interfaces/app-controller.interface";
import { IpcMain } from "electron";

export class WorkspaceController implements IAppController {
  constructor(private readonly _IPC: IpcMain) {}

  register(): void {
    console.log("not implemented");
  }
}
