import { IWorkspace } from "../interfaces/workspace.interface";
import { Record } from "immutable";

const defaultValues: IWorkspace = {
  name: "",
  path: "",
  timestamp: Date.now(),
};

export class Workspace extends Record<IWorkspace>(defaultValues) {}
