import { IWorkspace } from '@interfaces/index';
import { Record } from 'immutable';

const defaultValues: IWorkspace = {
  name: '',
  path: '',
  timestamp: 0,
};

export class Workspace extends Record<IWorkspace>(defaultValues) {}
