import { app, BrowserWindow, Menu, webContents } from "electron";
import windowStateKeeper from "electron-window-state";
import updater from "./updater";
import { menu, createTray } from "./menu";

import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

const { NODE_ENV } = process.env;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  createTray(win);

  // Window state manager
  let state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 800
  });

  // Create the browser window.
  win = new BrowserWindow({
    width: state.width,
    height: state.height,
    minWidth: 500,
    x: state.x,
    y: state.y,
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  });

  // and load the index.html of the app.
  win.loadFile("index.html");

  // Set window menu
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  if (NODE_ENV === "development") openDevTools();

  // Show app when ready.
  win.once("ready-to-show", win.show);

  // Set state manger.
  state.manage(win);

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

async function setupDevelopment() {
  try {
    await installExtension(VUEJS_DEVTOOLS)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(err => console.log("An error occurred: ", err));
  } catch (e) {
    console.error("Vue Devtools failed to install:", e.toString());
  }
}

function openDevTools() {
  win.webContents.executeJavaScript("require('devtron').install();");
  win.webContents.openDevTools({ mode: "undocked" });
  // win.webContents.on("devtools-opened", () => {
  //   win.webContents.once("devtools-focused", () => {
  //     const devtools = win.webContents.devToolsWebContents;
  //     // Insert Input Event
  //   });
  // });
}

function checkForUpdate() {
  setTimeout(updater, 3000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (NODE_ENV === "development") await setupDevelopment();
  checkForUpdate();
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
