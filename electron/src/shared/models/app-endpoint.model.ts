export enum WorkspaceHistoryEndpoint {
  LOAD = "load",
  SET_LAST_OPENED = "set-last-opened",
  UNSET_LAST_OPENED = "unset-last-opened",
  ADD_TO_HISTORY = "add-to-history",
  UPDATE_FROM_HISTORY = "update-from-history",
  REMOVE_FROM_HISTORY = "remove-from-history",
}

export enum WorkspaceEndpoint {
  LOAD = "load",
}

export enum WindowEndpoint {
  MAXIMIZE = "maximize",
  MINIMIZE = "minimize",
  CLOSE = "close",
  RESTORE = "restore",
}
