const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class Db {
  constructor() {
    this.instance = null;
    this.db = null;
  }
  connect(path) {
    this.db = new sqlite3.Database(path, err => {
      if (!err) return;
      console.log('🚀 数据库连接失败', err);
    });
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

module.exports = Db;
