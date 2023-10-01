import { IAppController } from "../interfaces/app-controller.interface";

export type Newable<T> = { new (...args: unknown[]): T };

export type ControllerRegistrar = (controllers: Newable<IAppController>[]) => void;
