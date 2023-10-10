import { IAppHandler, IAppHandlerOptions } from "@interfaces/app-handler.interface";
import { Record } from "immutable";

export class AppHandlerOptions extends Record<IAppHandlerOptions>({
  adaptor: (): void => void 0,
}) {}

export class AppHandler extends Record<IAppHandler>({
  channel: "",
  options: undefined,
}) {}
