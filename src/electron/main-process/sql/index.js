import { app, globalShortcut } from "electron";
import { getClipboardData } from "@/utils/clipboard.js";
import DataBase from "@/sql/index.js";

console.log("ddddddddddddddddd");
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

  // globalShortcut.register("CommandOrControl+v", e => {
  //   console.log("🚀 ~ file: background.js ~ line 82 ~ e", e);
  //   console.log("CommandOrControl+k执行了");
  //   getClipboardData().then(res => {
  //     console.log("🚀 ~ file: index.js ~ line 9 ~ text ~ res", res);
  //     Sqlite.insert();
  //   });
  // });
});
