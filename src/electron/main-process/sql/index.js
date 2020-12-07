const { app } = require("electron");
const ioHook = require("iohook");
import DataBase from "@/sql/index.js";
import { continuousDetect } from "@/utils/index";

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
    switch (rawcode) {
      case 86:
        if (event.ctrlKey) {
          continuousDetectFn(() => {
            console.log("连续触发ctrl+v");
          });
        }

        break;
    }
  });
});
