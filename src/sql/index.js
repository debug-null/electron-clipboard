// src/renderer/utils/db.js
// 建表脚本，导出db对象供之后使用
import path from "path";
import sq3 from "sqlite3";
// import { docDir } from './settings';
// 将数据存至系统用户目录，防止用户误删程序
export const dbPath = path.join("./data.sqlite1");

// const sqlite3 = sq3.verbose();
// const db = new sqlite3.Database(dbPath);
// db.serialize(() => {
//   db.run("create table test(name varchar(15))", function() {
//     db.run("insert into test values('hello,word')", function() {
//       db.all("select * from test", function(err, res) {
//         if (!err) {
//           console.log(JSON.stringify(res));
//         } else {
//           console.log(err);
//         }
//       });
//     });
//   });
// });
var sqlite3 = require("sqlite3").verbose();

class Db {
  constructor(options) {
    console.log(
      "🚀 ~ file: index.js ~ line 42 ~ Db ~ constructor ~ options",
      options
    );
  }
  init() {
    const db = new sqlite3.Database(dbPath);
    db.serialize(function() {
      db.run(`CREATE TABLE "paste_con" (
        "id"	INTEGER,
        "type"	TEXT,
        "content"	TEXT NOT NULL,
        "source"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
      )`);
    });
  }
}

export default Db;
