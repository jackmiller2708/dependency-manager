import { IAppController } from "../interfaces/app-controller.interface";

export type Newable<T> = {
  new (...args: never[]): T;
};

export type ControllerRegistrar = (
  controllers: Newable<IAppController>[]
) => void;

export type HandlerRegistrar = <P = void, T = unknown>(
  endpoint: string,
  handler: (args: P) => T
) => void;