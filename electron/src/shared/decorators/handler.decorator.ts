import "reflect-metadata";

export const HANDLER_METADATA_KEY = "handler";

export function Handler(channel: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, propKey: string): void => {
    Reflect.defineMetadata(HANDLER_METADATA_KEY, channel, target, propKey);
  };
}
