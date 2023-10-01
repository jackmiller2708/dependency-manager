import { IWorkspaceHistory } from "../interfaces/workspace-history.interface";
import { Record, List } from "immutable";

const defaultValues: IWorkspaceHistory = {
  workspaces: List(),
  lastOpened: undefined,
};

export class WorkspaceHistory extends Record<IWorkspaceHistory>(defaultValues
) {}
