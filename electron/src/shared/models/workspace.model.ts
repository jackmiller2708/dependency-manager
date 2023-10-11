import { join } from "path";
import { existsSync } from "fs";
import { IWorkspace } from "../interfaces/workspace.interface";
import { Record } from "immutable";

const defaultValues: IWorkspace = {
  name: "",
  path: "",
  timestamp: Date.now(),
};

const ENTRY_FILE = "package.json";

export class Workspace extends Record<IWorkspace>(defaultValues) {
  static adaptor(payload: string | undefined): Workspace | undefined {
    return payload !== undefined ? new Workspace(JSON.parse(payload)) : payload;
  }

  static isPathValid(path: string): boolean {
    return existsSync(join(path, ENTRY_FILE));
  }
}
