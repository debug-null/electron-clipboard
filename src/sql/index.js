const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
var instance = null;
class Db {
  constructor() {
    this.db = null;
  }
  connect(path) {
    console.log('🚀 ~ file: index.js ~ line 15 ~ Db ~ connect ~ instance', instance);
    if (instance) instance;

    // 检查目录是否存在，不存在创建
    const basePath = './temp_sql'; // 数据库存放 目录
    const isSqlDirectory = fs.existsSync(basePath);
    if (!isSqlDirectory) {
      fs.mkdirSync(basePath);
    }

    this.db = new sqlite3.Database(basePath + '/' + path, err => {
      if (err) {
        alert(err);
      }
    });

    this.instance = this.db;
  }
  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        resolve(this);
      });
    });
  }
  /**
   * 取单条
   * @param {}} sql
   * @param {*} params
   */
  get(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
  /**
   *取多条
   * @param {*} sql
   * @param {*} params
   */
  all(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
  /**
   * 运行多条
   * @param {} sql
   */
  exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, err => {
        if (err) reject(err);
        resolve(err);
      });
    });
  }

  each(sql, params, callback) {
    this.db.each(sql, params, (err, row) => {
      callback(err, row);
    });
  }

  close() {
    console.log('关闭数据库');
    this.db.close();
  }
}

export default Db;
