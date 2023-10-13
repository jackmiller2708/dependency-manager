import { IWorkspaceHistory } from '@interfaces/IWorkspaceHistory.interface';
import { List, Record } from 'immutable';

const defaultValues: IWorkspaceHistory = {
  workspaces: List(),
  lastOpened: undefined,
};

export class WorkspaceHistory extends Record<IWorkspaceHistory>(defaultValues) {}
