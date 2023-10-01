import { ControllerRegistrar, Newable } from "../../shared/types/utils.type";
import { IAppController } from "../../shared/interfaces/app-controller.interface";
import { IpcMain } from "electron";

export function makeControllerRegistrar(ipcMain: IpcMain): ControllerRegistrar {
  return (controllers: Newable<IAppController>[]): void => {
    for (const controller of controllers) {
      new controller(ipcMain).register();
    }
  };
}
