var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./test.sqlite3', err => {
  console.log('🚀 ~ file: index.js ~ line 3 ~ err', err);
});

// db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');
db.run(
  `CREATE TABLE IF NOT EXISTS 'paste_con' (
  "id"	INTEGER,
  "type"	TEXT,
  "content"	TEXT NOT NULL,
  "source"	TEXT,
  PRIMARY KEY("id" AUTOINCREMENT)
)`,
  err => {
    console.log('🚀 ~ file: index2.js ~ line 14 ~ err', err);
  }
);

db.run('INSERT INTO paste_con(type,content,source) Values (?,?,?)', ['all', '了递四方速递', 'didi'], function(err) {
  console.log('🚀 ~ file: index.js ~ line 9 ~ db.run ~ err', err);
  console.log(this);
  console.log(this.lastID);
});

db.run('UPDATE  paste_con SET  source = 1 WHERE id =1', function(err) {
  if (err) throw err;
  console.log('2222');
  console.log(this);
});

// db.run(`UPDATE paste_con SET content ='啦啦啦' WHERE id = 2 `, err => {
//   console.log('🚀 ~ file: index2.js ~ line 26 ~ err', err);
//   console.log(this);
// });

// db.run('Update lorem Set ');
// db.get('select * from paste_con', (err, row) => {
//   console.log('🚀 ~ file: index.js ~ line 13 ~ db.get ~ row', row);
// });
db.all('select * from paste_con', (err, row) => {
  console.log('🚀 ~ file: index.js ~ line 13 ~ db.get ~ row', row);
});

// db.exec('select * from lorem', (err, row) => {
//   console.log('🚀 ~ file: index.js ~ line 19 ~ db.exec ~ err', err);
//   console.log('🚀 ~ file: index.js ~ line 13 ~ db.get ~ row', row);
// });

// db.serialize(function() {
//   // var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
//   // for (var i = 0; i < 10; i++) {
//   //   stmt.run('Ipsum ' + i);
//   // }
//   // stmt.finalize();
//   // db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
//   //   console.log(row.id + ': ' + row.info);
//   // });
// });

// db.close();
