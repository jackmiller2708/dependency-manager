import { App, BrowserWindow } from "electron";

export class AppService {
  static window: BrowserWindow | undefined;
  static app: App | undefined;
}
