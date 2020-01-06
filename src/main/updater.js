import { dialog } from "electron";
import logger from "electron-log";
import { autoUpdater } from "electron-updater";

autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = "info";

autoUpdater.autoDownload = false;

export default () => {
  autoUpdater.checkForUpdates().catch(e => console.error(e.message));
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
      })
      .catch(e => console.error(e.message));
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
      })
      .catch(e => console.error(e.message));
  });
};
