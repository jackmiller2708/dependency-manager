import { EventType } from './EventType.enum';
import { IEvent } from '@interfaces/IEvent.interface';
import { Record } from 'immutable';

export enum WorkspaceEventMessages {
  CLOSE = 'close-workspace',
  OPEN = 'open-workspace',
}

const defaultValues: IEvent<WorkspaceEventMessages | undefined, void> = {
  type: EventType.WORKSPACE,
  message: undefined,
  data: undefined,
};

export class WorkspaceEvent extends Record<IEvent<WorkspaceEventMessages | undefined, void>>(defaultValues) {}
