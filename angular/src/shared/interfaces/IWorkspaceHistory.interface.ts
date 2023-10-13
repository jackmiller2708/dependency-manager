import { List, RecordOf } from 'immutable';
import { IWorkspace } from './IWorkspace.interface';

export interface IWorkspaceHistory {
  workspaces: List<RecordOf<IWorkspace>>;
  lastOpened: RecordOf<IWorkspace> | undefined;
}
