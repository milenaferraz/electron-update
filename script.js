const { ipcRenderer } = require("electron");
const notification = document.getElementById("notification");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");
const version = document.getElementById("version");
const log = require("electron-log");

ipcRenderer.send("app_version");

ipcRenderer.on("app_version", (event, arg) => {
  log.info("App version", arg.version);
  ipcRenderer.removeAllListeners("app_version");
  version.innerHTML = "Version " + arg.version;
});

// ipcRenderer.on("update_available", () => {
//   log.info("update_available");
//   ipcRenderer.removeAllListeners("update_available");
//   message.innerHTML = "A new update is available. Downloading now...";
//   notification.classList.remove("hidden");
// });

// ipcRenderer.on("update_downloaded", () => {
//   log.info("update_downloaded");
//   ipcRenderer.removeAllListeners("update_downloaded");
//   message.innerHTML =
//     "Update Downloaded. It will be installed on restart. Restart now?";
//   restartButton.classList.remove("hidden");
//   notification.classList.remove("hidden");
// });

// function closeNotification() {
//   log.info("closeNotification");
//   notification.classList.add("hidden");
// }
// function restartApp() {
//   log.info("restartApp");
//   ipcRenderer.send("restart_app");
// }
