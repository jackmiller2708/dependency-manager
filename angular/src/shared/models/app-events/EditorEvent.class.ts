import { EventType } from './EventType.enum';
import { IEvent } from '@interfaces/IEvent.interface';
import { Record } from 'immutable';

export enum EditorEventMessages {
  CLOSE = 'close-editor',
  OPEN = 'open-editor',
  EXIT = 'exit-editor',
}

const defaultValues: IEvent<EditorEventMessages | undefined, void> = {
  type: EventType.EDITOR,
  message: undefined,
  data: undefined,
};

export class EditorEvent extends Record<IEvent<EditorEventMessages | undefined, void>>(defaultValues) {}
