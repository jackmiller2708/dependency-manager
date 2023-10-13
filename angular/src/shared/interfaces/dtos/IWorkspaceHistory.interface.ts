import { IWorkspace } from './IWorkspace.interface';

export interface IWorkspaceHistory {
  workspaces: IWorkspace[];
  lastOpened: IWorkspace | undefined;
}
