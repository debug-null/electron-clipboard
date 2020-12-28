'use strict';

import { app, protocol, BrowserWindow, Menu, screen, globalShortcut } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';
import { setTray } from './electron/main-process/util';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

async function createWindow() {
  const screenObj = screen.getPrimaryDisplay().workAreaSize;
  const winObj = {
    width: screenObj.width,
    height: 350,
    fullscreen: false,
    y: screenObj.height, // 置底
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  };

  // 开发环境
  if (isDevelopment) {
    Object.assign(winObj, {
      height: 850,
      darkTheme: true,
      frame: true,
      x: 0,
      y: 0
    });
  } else {
    // 隐藏菜单
    Menu.setApplicationMenu(null);
  }

  // Create the browser window.
  const win = new BrowserWindow(winObj);
  win.setSkipTaskbar(true); // 隐藏任务栏

  setTray(win);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

function initialize() {
  // 保证应用程序是个单例
  const shouldQuit = !app.requestSingleInstanceLock();
  if (shouldQuit) return app.quit();

  loadMainProcess();
}

/**
 * 注册主线程文件里的所有js
 *
 */
function loadMainProcess() {
  require('./electron/main-process/index.js');
}

initialize();
