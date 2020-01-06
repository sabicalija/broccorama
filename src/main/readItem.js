import { BrowserWindow } from "electron";

let offscreenWindow;

export default (url, callback) => {
  // Create offscreen browser window
  offscreenWindow = new BrowserWindow({
    width: 2000,
    height: 2000,
    show: false,
    webPreferences: {
      offscreen: true,
      nodeIntegration: false
    }
  });
  // Load requested URL
  offscreenWindow.loadURL(url);
  offscreenWindow.webContents.on("did-finish-load", e => {
    // Get page title
    const title = offscreenWindow.getTitle();
    // Get page screenshot
    offscreenWindow.webContents
      .capturePage()
      .then(image => {
        // Convert image
        const screenshot = image.toDataURL();
        // Return result
        callback({ title, screenshot, url });
        // Cleanup
        offscreenWindow.close();
        offscreenWindow = null;
      })
      .catch(e => {
        callback({ title, screenshot: "", url });
        console.error("Failed to capture screen", e.toString());
      });
  });
};
