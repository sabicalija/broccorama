import { join } from "path";
import { Menu, Tray } from "electron";
const createMenu = win => {
  const menu = Menu.buildFromTemplate([
    // { role: "appMenu" },
    // { role: "fileMenu" },
    {
      label: "Recipes",
      submenu: [
        {
          label: "New Recipe",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            win.webContents.send("menu-new-recipe");
          }
        },
        {
          label: "Read Recipe",
          accelerator: "CmdOrCtrl+Enter",
          click: () => {
            win.webContents.send("menu-open-recipe");
          }
        },
        {
          label: "Open in Browser",
          accelerator: "CmdOrCtrl+Shift+O",
          click: () => {
            win.webContents.send("menu-open-native");
          }
        },
        {
          label: "Search Items",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            win.webContents.send("menu-search-recipe");
          }
        }
      ]
    },
    { role: "editMenu" },
    // { role: "viewMenu" },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          role: "about"
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
};
export { createMenu };
