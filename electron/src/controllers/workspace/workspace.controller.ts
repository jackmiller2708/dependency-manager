import { IAppController } from "@interfaces/app-controller.interface";
import { Controller } from "@decorators/controller.decorator";
import { IpcMain } from "electron";

@Controller("workspace")
export class WorkspaceController implements IAppController {
  constructor(private readonly _IPC: IpcMain) {}

  register(): void {
    console.log("not implemented");
  }
}
