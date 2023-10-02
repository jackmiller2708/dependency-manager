import { IWorkspaceHistory } from "@interfaces/workspace-history.interface";
import { Record, List } from "immutable";
import { Workspace } from "./workspace.model";

const defaultValues: IWorkspaceHistory = {
  workspaces: List(),
  lastOpened: undefined,
};

export class WorkspaceHistory extends Record<IWorkspaceHistory>(defaultValues) {
  private readonly MAXIMUM_WORKSPACES = 10;

  addWorkspace(workspace: Workspace): this {
    return this.set("lastOpened", workspace).update("workspaces", (workspaces) => {
      let _workspaces = workspaces.filter(({ path }) => workspace.path !== path).unshift(workspace);

      if (_workspaces.size > this.MAXIMUM_WORKSPACES) {
        _workspaces = _workspaces.slice(0, this.MAXIMUM_WORKSPACES);
      }

      return _workspaces;
    })
  }

  updateWorkspace(workspace: Workspace): this {
    return this.withMutations((history: this): this => {
      let index = 0;

      while (index < history.workspaces.size) {
        if (history.workspaces.get(index)?.path === workspace.path) {
          break;
        }

        index++;
      }

      if (index === history.workspaces.size) {
        return history;
      }

      if (history.lastOpened?.path === workspace.path) {
        history.setIn(["lastOpened", "name"], workspace.name);
      }

      return history.setIn(["workspaces", index, "name"], workspace.name);
    });
  }

  removeWorkspace(workspace: Workspace): this {
    return this.withMutations((history: this): this => {
      let index = 0;

      while (index < history.workspaces.size) {
        if (history.workspaces.get(index)?.path === workspace.path) {
          break;
        }

        index++;
      }

      if (index === history.workspaces.size) {
        return history;
      }

      if (history.lastOpened?.path === workspace.path) {
        history = history.set("lastOpened", undefined);
      }

      return history.update("workspaces", (workspaces) => workspaces.remove(index));
    });
  }

  setLastOpened(workspace: Workspace): this {
    return this.withMutations((history: this): this => {
      let index = 0;

      while (index < history.workspaces.size) {
        if (history.workspaces.get(index)?.path === workspace.path) {
          break;
        }

        index++;
      }

      if (index === history.workspaces.size) {
        return history;
      }

      const temp = history.workspaces.get(index)!;

      return history
        .set("lastOpened", temp)
        .update("workspaces", (workspaces) =>
          workspaces.remove(index).unshift(temp)
        );
    });
  }

  unsetLastOpened() {
    this.set("lastOpened", undefined);
  }
}
