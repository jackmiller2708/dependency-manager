import { AppHandler, AppHandlerOptions } from "@models/app-handler.model";
import "reflect-metadata";

export const HANDLER_METADATA_KEY = "handler";

export function Handler(channel: string, options?: AppHandlerOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, propKey: string): void => {
    Reflect.defineMetadata(HANDLER_METADATA_KEY, new AppHandler({ channel, options }), target, propKey);
  };
}
