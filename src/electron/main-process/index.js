
import Sql from '@/sql/index.js';
import { getClipboardData } from '@/utils/clipboard.js';
const { app, BrowserWindow } = require('electron');
const ioHook = require('iohook');
const Db = new Sql();

const activeWin = require('active-win');

function SqlInit() {
  const sql = `CREATE TABLE IF NOT EXISTS "paste_con" (
        "id"	INTEGER,
        "type"	TEXT,
        "content"	TEXT NOT NULL,
        "source"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
  )`;
  Db.connect('superCopy.sqlite3');
  Db.run(sql);
  Db.close();
}

app.on('ready', () => {
  SqlInit();
});

app.on('browser-window-created', () => {
  ioHook.start();

  ioHook.on('keypress', event => {
    const rawcode = event.rawcode;
    const platform = process.platform;
    if (platform === 'win32') {
      switch (rawcode) {
        case 67:
          if (event.ctrlKey) {
            (async () => {
              console.log('Win-连续触发ctrl+c');
              const clipboardData = await getClipboardData();
              const windowInfo = await activeWin();

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
            })();
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
