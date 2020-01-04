const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.autoDownload = false;

module.exports = () => {
  autoUpdater.checkForUpdates();
  debugger;
  autoUpdater.on("update-available", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update available",
        message:
          "A new version of Brocc-o-rama is available. Do you want to update now?",
        buttons: ["Update", "No"]
      })
      .then(({ response: buttonIdx }) => {
        if (buttonIdx === 0) autoUpdater.downloadUpdate();
      });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update ready",
        message: "Install and restart now?",
        buttons: ["Yes", "Later"]
      })
      .then(({ response: buttonIdx }) => {
        if (buttonIdx === 0) autoUpdater.quitAndInstall(false, true);
      });
  });
};
