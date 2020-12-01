import { app, globalShortcut } from "electron";
import { getClipboardData } from "@/utils/clipboard.js";
import sqlite from "@/sql/index.js";

app.on("browser-window-created", () => {
  globalShortcut.register("CommandOrControl+v", e => {
    console.log("🚀 ~ file: background.js ~ line 82 ~ e", e);
    console.log("CommandOrControl+k执行了");
    getClipboardData().then(res => {
      console.log("🚀 ~ file: index.js ~ line 9 ~ text ~ res", res);
    });
  });
});
