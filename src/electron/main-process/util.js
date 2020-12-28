const path = require('path');
import {Tray, Menu} from 'electron';

export const setTray = (win) => {
  let tray = null;
  // eslint-disable-next-line no-undef
  const trayPath = path.join(__static, 'tray.png');
  tray = new Tray(trayPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Super paste',
      click: () => {
        win.show();
      }
    },
    { label: 'test', type: 'radio', click: () => {
      console.log('TEST');
    } }
  ]);
  tray.setToolTip('Super paste');
  tray.setContextMenu(contextMenu);
};

