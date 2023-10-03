import { IpcMain, IpcMainInvokeEvent } from "electron";
import { HandlerRegistrar, Newable } from "../../shared/types/utils.type";
import { getRegisteredControllers } from "@decorators/controller.decorator";
import { HANDLER_METADATA_KEY } from "@decorators/handler.decorator";
import { IAppController } from "@interfaces/app-controller.interface";
import { Map } from "immutable";

import "reflect-metadata";
import "./workspace-history/workspace-history.controller";
import "./workspace/workspace.controller";

export function initControllers(ipcMain: IpcMain) {
  for (const [name, controller] of getRegisteredControllers()) {
    const _controllerInstance = new controller();
    const _registerHandler = makeHandlerRegistrar(_controllerInstance, ipcMain);

    for (const [handlerName, channel] of getRegisteredHandlers(controller)) {
      _registerHandler(
        `${name}-${channel}`,
        _controllerInstance[handlerName as keyof IAppController]
      );
    }
  }
}

function getRegisteredHandlers(controller: Newable<unknown>): Map<string, string> {
  let handlers = Map<string, string>();

  for (const propName of Object.getOwnPropertyNames(controller.prototype)) {
    if (!Reflect.hasMetadata(HANDLER_METADATA_KEY, controller.prototype, propName)) {
      continue;
    }

    handlers = handlers.set(
      propName,
      Reflect.getMetadata(HANDLER_METADATA_KEY, controller.prototype, propName)
    );
  }

  return handlers;
}

function makeHandlerRegistrar(thisArg: IAppController, ipcMain: IpcMain): HandlerRegistrar {
  return <P = void, T = unknown>(endpoint: string, handler: (args: P) => T): void => {
    const _internalHandler = (_: IpcMainInvokeEvent, ..._args: unknown[]): T =>
      handler.apply(thisArg, _args[0] as [args: P]);

    ipcMain.handle(endpoint, _internalHandler);
  };
}
