const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
require("dotenv").config();
const log = require("electron-log");
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.webContents.openDevTools({ mode: "detach" });
}

app.on("ready", () => {
  createWindow();
});

setInterval(() => {
  const result = autoUpdater.checkForUpdatesAndNotify();
  log.info("Verificando updates..", result);
}, 10000);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("app_version", (event) => {
  log.info("app_version");
  event.sender.send("app_version", { version: app.getVersion() });
});

// autoUpdater.on("update-available", () => {
//   log.info("update-available");
//   mainWindow.webContents.send("update_available");
// });

// autoUpdater.on("update-downloaded", () => {
//   log.info("update-downloaded");
//   mainWindow.webContents.send("update_downloaded");
// });

// ipcMain.on("restart_app", () => {
//   autoUpdater.quitAndInstall();
// });
