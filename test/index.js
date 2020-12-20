const Sql = require('./sql');
const db = new Sql();
db.connect('./test.sqlite3');

db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)').then(res => {
  console.log('🚀 ~ file: index.js ~ line 6 ~ db.run ~ res', res);
});
db.run('INSERT INTO lorem Values (?)', 'dddd').then(res => {
  console.log('🚀 ~ file: index.js ~ line 6 ~ db.run ~ res', res);
});

// db.run('select * from lorem').then(res => {
//   console.log('🚀 ~ file: index.js ~ line 13 ~ db.run ~ res', res);
// });

db.get('select * from lorem').then(res => {
  console.log('🚀 ~ file: index.js ~ line 17 ~ db.get ~ res', res);
});
