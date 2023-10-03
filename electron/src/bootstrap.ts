import { BrowserWindow, app, protocol, net, Menu, ipcMain } from "electron";
import { format, pathToFileURL } from "url";
import { initControllers } from "@controllers/index";
import { join } from "path";

function createWindow(): BrowserWindow {
  return new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
}

function bootstrap(window: BrowserWindow): void {
  const servePath = app.isPackaged
    ? format({ pathname: "index.html", protocol: "file", slashes: true })
    : "http://localhost:4200";

  initControllers(ipcMain);
  Menu.setApplicationMenu(null);
  window.loadURL(servePath);

  if (!app.isPackaged) {
    window.webContents.openDevTools();
  }
}

export function initApp() {
  protocol.handle("file", (req) => {
    const filePath = pathToFileURL(
      join(process.resourcesPath, "ui", req.url.slice("file://".length))
    ).toString();

    return net.fetch(filePath, { bypassCustomProtocolHandlers: true });
  });

  bootstrap(createWindow());
}
