import Sql from '@/sql/index.js';
import { getClipboardData } from '@/utils/clipboard.js';
const { app, BrowserWindow } = require('electron');
const ioHook = require('iohook');
const Db = new Sql();

const activeWin = require('active-win');

function SqlInit() {
  const sql = `CREATE TABLE IF NOT EXISTS "paste_con" (
        "id"	INTEGER,
        "category"	TEXT,
        "content"	TEXT NOT NULL,
        "title" TEXT,
        "type"	TEXT,
        "application" TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
  )`;
  Db.connect('superCopy.sqlite3');
  Db.run(sql);
  Db.close();
}

var setPaste = platform => {
  console.log(`${platform}-触发ctrl+c`);
  // 300 毫秒延迟，不然获取的会是旧的值
  setTimeout(async () => {
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
  }, 300);
};

app.on('ready', () => {
  SqlInit();
});

app.on('browser-window-created', () => {
  ioHook.start();

  ioHook.on('keypress', event => {
    console.log('🚀 ~ file: index.js ~ line 52 ~ app.on ~ event', event);
    const rawcode = event.rawcode;
    const platform = process.platform;
    if (platform === 'win32') {
      switch (rawcode) {
        case 67:
          if (event.ctrlKey) {
            setPaste('Windows');
          }
          break;
        case 88:
          // alt+x
          if (event.altKey) {
            const win = BrowserWindow.getAllWindows();
            win[0].show();
          }
          break;
        case 73:
          if (event.ctrlKey) {
            // ctrl+i 打开控制台
            const win = BrowserWindow.getAllWindows();
            win[0].webContents.openDevTools();
          }

          break;
      }
    }

    if (platform === 'darwin') {
      switch (rawcode) {
        case 8:
          if (event.metaKey) {
            setPaste('Mac');
          }
          break;
      }
    }
  });
});
