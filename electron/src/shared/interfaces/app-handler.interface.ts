/* eslint-disable @typescript-eslint/no-explicit-any */

import { RecordOf } from "immutable";

export interface IAppHandlerOptions {
  adaptor: (payload: string) => any;
}

export interface IAppHandler {
  channel: string;
  options?: RecordOf<IAppHandlerOptions>;
}
