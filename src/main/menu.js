import { join } from "path";
import { Menu, Tray } from "electron";
const menu = Menu.buildFromTemplate([
  // { role: "appMenu" },
  { role: "fileMenu" },
  { role: "editMenu" },
  { role: "viewMenu" },
  { role: "windowMenu" }
]);
const createTray = win => {
  const tray = new Tray(join(__dirname, "logo.png"));
  const trayMenu = Menu.buildFromTemplate([
    {
      label: "Brocc-o-rama!",
      click: () => {
        console.log("DEBUG_CLICK");
        // if (e.shiftKey) {
        win.isVisible() ? win.hide() : win.show();
        // }
      }
    },
    {
      type: "separator"
    },
    {
      role: "Help"
    }
  ]);
  // tray.setToolTip("Brocc-o-rama");
  tray.setContextMenu(trayMenu);
  tray.setTitle("Broccorama");
  tray.on("right-click", () => console.log("RIGHT_CLICK"));
};
export { menu, createTray };
