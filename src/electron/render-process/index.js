import { ipcRenderer } from "electron";
import store from "@/store";
ipcRenderer.on("cilpboard-post-text", (event, data) => {
  console.log("🚀 ~ file: index.js ~ line 4 ~ ipcMain.on ~ data", data);
  store.dispatch("addAll", {
    category: "all", //类别
    type: "text", //类型
    content: data, // 内容
    icon: "didi", //图标
    tag: "钉钉", //软件名
    aplication: "app" // 应用名
  });
});
