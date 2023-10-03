import { ControllerRegistrar, HandlerRegistrar, Newable } from "../../shared/types/utils.type";
import { IpcMain, IpcMainInvokeEvent } from "electron";
import { IAppController } from "@interfaces/app-controller.interface";

export function makeControllerRegistrar(ipcMain: IpcMain): ControllerRegistrar {
  return (controllers: Newable<IAppController>[]): void => {
    for (const controller of controllers) {
      new controller(ipcMain as never).register();
    }
  };
}

export function makeHandlerRegistrar(thisArg: IAppController ,ipcMain: IpcMain): HandlerRegistrar {
  return <P = void, T = unknown>(endpoint: string, handler: (args: P) => T ): void => {
    const _internalHandler = (_: IpcMainInvokeEvent, ..._args: unknown[]): T => handler.apply(thisArg, _args[0] as [args: P]);

    ipcMain.handle(endpoint, _internalHandler);
  };
}