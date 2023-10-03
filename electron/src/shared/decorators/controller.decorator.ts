import { Map as immutableMap } from "immutable";
import { IAppController } from "@interfaces/app-controller.interface";
import { Newable } from "@utils/utils.type";

const REGISTERED_CONTROLLERS = new Map<string, Newable<unknown>>();

export function getRegisteredControllers() {
  return immutableMap<string, Newable<IAppController>>(
    REGISTERED_CONTROLLERS as unknown as Record<string, never>
  );
}

export function Controller(name: string) {
  return (target: Newable<unknown>): void => {
    REGISTERED_CONTROLLERS.set(name, target);
  };
}
