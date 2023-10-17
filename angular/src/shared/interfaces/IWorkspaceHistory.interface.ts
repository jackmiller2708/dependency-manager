import { Workspace } from '@models/Workspace.class';
import { List } from 'immutable';

export interface IWorkspaceHistory {
  workspaces: List<Workspace>;
  lastOpened: Workspace | undefined;
}
