const fs = require('fs');
const sq3 = require('sqlite3');

class Db {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        basePath: './temp_sql' // 数据库存放 目录
      },
      options
    );

    // 检查目录是否存在，不存在创建
    const isSqlDirectory = fs.existsSync(this.options.basePath);
    if (!isSqlDirectory) {
      fs.mkdirSync(this.options.basePath);
    }

    this.init();
  }

  /**
   *
   * @param {*} data : sql 创建的表sql, name: 数据库名称
   */
  init(data) {
    if (data && data.sql.length) {
      const sqlite3 = sq3.verbose();
      this.db = new sqlite3.Database(
        this.options.basePath + '/' + data.name + '.sqlite3'
      );
    }
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        resolve({ id: this.lastID });
      });
    });
  }
}

export default Db;

// const { app, powerMonitor } = require("electron");

// app.on("ready", () => {
//   powerMonitor.on("suspend", e => {
//     console.log("suspend");
//   });
//   powerMonitor.on("resume", e => {
//     console.log("resume");
//   });
//   powerMonitor.on("on-battery", e => {
//     console.log("on-battery");
//   });
//   powerMonitor.on("shutdown", e => {
//     console.log("shutdown");
//   });
//   powerMonitor.on("lock-screen", e => {
//     console.log("lock-screen");
//   });
//   powerMonitor.on("unlock-screen", e => {
//     console.log("unlock-screen");
//   });
// });
