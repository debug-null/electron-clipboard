const { app, BrowserWindow } = require('electron');
const ioHook = require('iohook');
import DataBase from '@/sql/index.js';
import { getClipboardData } from '@/utils/clipboard.js';
import { continuousDetect } from '@/utils/index';
const activeWin = require('active-win');

app.on('browser-window-created', () => {
  const Sqlite = new DataBase();
  const sql = [
    `CREATE TABLE "paste_con" (
        "id"	INTEGER,
        "type"	TEXT,
        "content"	TEXT NOT NULL,
        "source"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
  )`
  ];
  Sqlite.init({ sql, name: 'superCopy' });

  ioHook.start();
  // 初始化闭包
  const continuousDetectFn = continuousDetect();
  ioHook.on('keypress', event => {
    console.log('🚀 ~ file: index.js ~ line 25 ~ ioHook.on ~ event', event);
    const rawcode = event.rawcode;
    const platform = process.platform;
    if (platform === 'win32') {
      switch (rawcode) {
        case 86:
          if (event.ctrlKey) {
            continuousDetectFn(async () => {
              console.log('Win-连续触发ctrl+v');
              const clipboardData = await getClipboardData();
              const windowInfo = await activeWin();
              console.log('🚀 ~ file: index.js ~ line 35 ~ continuousDetectFn ~ windowInfo', windowInfo);
              if (clipboardData.text) {
                const win = BrowserWindow.getAllWindows();
                win[0].webContents.send('cilpboard-post-text', {
                  category: 'all', // 类别
                  type: 'text', // 类型
                  content: clipboardData.text,
                  title: windowInfo.title,
                  application: windowInfo.owner.name
                });
              }
            });
          }

          break;
      }
    }

    if (platform === 'darwin') {
      switch (rawcode) {
        case 9:
          if (event.metaKey) {
            continuousDetectFn(async () => {
              console.log('MAC-连续触发ctrl+v');
              const text = await getClipboardData();
              console.log('🚀 ~ file: index.js ~ line 49 ~ continuousDetectFn ~ text', text);
            });
          }

          break;
      }
    }
  });
});
