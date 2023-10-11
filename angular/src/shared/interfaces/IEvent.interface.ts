import { RecordOf } from 'immutable';

export interface IEvent<P, T> {
  type: string;
  message: P;
  data: T;
}

export type AppEvent = RecordOf<IEvent<unknown, unknown>>;
