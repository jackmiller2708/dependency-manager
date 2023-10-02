import { IAppController } from "../interfaces/app-controller.interface";

export type Newable<T> = {
  new (...args: never[]): T;
};

export type ControllerRegistrar = (
  controllers: Newable<IAppController>[]
) => void;
