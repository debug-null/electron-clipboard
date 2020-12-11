const { app, BrowserWindow } = require("electron");
const ioHook = require("iohook");
import DataBase from "@/sql/index.js";
import { getClipboardData } from "@/utils/clipboard.js";
import { continuousDetect } from "@/utils/index";
const activeWin = require("active-win");

app.on("browser-window-created", () => {
  let Sqlite = new DataBase();
  let sql = [
    `CREATE TABLE "paste_con" (
        "id"	INTEGER,
        "type"	TEXT,
        "content"	TEXT NOT NULL,
        "source"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
  )`
  ];
  Sqlite.init({ sql, name: "superCopy" });

  ioHook.start();
  //初始化闭包
  let continuousDetectFn = continuousDetect();
  ioHook.on("keypress", event => {
    let rawcode = event.rawcode;
    let platform = process.platform;
    if (platform === "win32") {
      switch (rawcode) {
        case 86:
          if (event.ctrlKey) {
            continuousDetectFn(async () => {
              console.log("Win-连续触发ctrl+v");
              let clipboardData = await getClipboardData();
              let windowInfo = await activeWin();
              console.log(
                "🚀 ~ file: index.js ~ line 35 ~ continuousDetectFn ~ windowInfo",
                windowInfo
              );
              if (clipboardData.text) {
                let win = BrowserWindow.getAllWindows();
                win[0].webContents.send("cilpboard-post-text", {
                  category: "all", //类别
                  type: "text", //类型
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

    if (platform === "darwin") {
      switch (rawcode) {
        case 9:
          if (event.metaKey) {
            continuousDetectFn(async () => {
              console.log("MAC-连续触发ctrl+v");
              let text = await getClipboardData();
              console.log(
                "🚀 ~ file: index.js ~ line 49 ~ continuousDetectFn ~ text",
                text
              );
            });
          }

          break;
      }
    }
  });
});
