/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { IpcMain, IpcMainInvokeEvent } from "electron";
import { HandlerRegistrar, Newable } from "@utils/utils.type";
import { getRegisteredControllers } from "@decorators/controller.decorator";
import { HANDLER_METADATA_KEY } from "@decorators/handler.decorator";
import { IAppController } from "@interfaces/app-controller.interface";
import { AppHandler } from "@models/app-handler.model";
import { Maybe } from "@models/monads/maybe.monad";
import { Map } from "immutable";

import "reflect-metadata";
import "./workspace-history/workspace-history.controller";
import "./workspace/workspace.controller";
import "./window/window.controller";

export function initControllers(ipcMain: IpcMain): Promise<void> {
  return new Promise<void>((resolve) => {
    for (const [name, controller] of getRegisteredControllers()) {
      const _controllerInstance = new controller();
      const _registerHandler = makeHandlerRegistrar(_controllerInstance, ipcMain);

      for (const [handlerName, handlerConfig] of getRegisteredHandlers(controller)) {
        const originalHandler = (_controllerInstance[handlerName as keyof IAppController] as Function).bind(_controllerInstance);
        const handler = handlerConfig.options?.adaptor
          ? registerAdaptor(handlerConfig.options.adaptor, originalHandler)
          : originalHandler;

        _registerHandler(`${name}-${handlerConfig.channel}`, handler);
      }
    }

    resolve();
  });
}

function getRegisteredHandlers(controller: Newable<unknown>): Map<string, AppHandler> {
  let handlers = Map<string, AppHandler>();

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

function registerAdaptor<P = void, T = unknown>(adaptor: (payload: string) => T | void, handler: (args: P) => T): (args: string) => Promise<Awaited<T | undefined>> {
  return (args: string): Promise<Awaited<T | undefined>> => {
    const params = Maybe.lift(args)
      .map((value: string): any => adaptor(value))
      .unwrap();

    return Promise.resolve<T | undefined>(handler(params) as T);
  };
}

function makeHandlerRegistrar(thisArg: IAppController, ipcMain: IpcMain): HandlerRegistrar {
  return <P = void, T = unknown>(endpoint: string, handler: (args: P) => T): void => {
    const _handlerWrapper = async (_: IpcMainInvokeEvent, ..._args: unknown[]): Promise<string | undefined> => {
      return Maybe.lift(await Promise.resolve(handler.call(thisArg, _args[0] as P)))
        .map((res) => JSON.stringify(res))
        .unwrap();
    };

    ipcMain.handle(endpoint, _handlerWrapper);
  };
}
