import { Newable } from "./../types/utils.type";

export const REGISTERED_CONTROLLERS = new Map<string, Newable<unknown>>();

export function Controller(name: string) {
  return (target: Newable<unknown>): void => {
    REGISTERED_CONTROLLERS.set(name, target);
  };
}
