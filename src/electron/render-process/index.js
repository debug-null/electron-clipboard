import { ipcRenderer } from 'electron';
import Sql from '@/sql/index.js';
import store from '@/store';
const Db = new Sql();
Db.connect('superCopy.sqlite3');

ipcRenderer.on('cilpboard-post-text', (event, data) => {
  console.log('🚀 ~ file: index.js ~ line 4 ~ ipcRenderer.on ~ data', data);
  const sql = `INSERT INTO paste_con(category,content,title,type,application) VALUES (?,?,?,?,?)`;
  Db.run(sql, [data.category, data.content, data.title, data.type, data.application]).then(res => {
    console.log('🚀 ~ file: index.js ~ line 27 ~ Db.run ~ res', res);
    store.dispatch('addAll', data);

    const myNotification = new Notification('通知', {
      body: '粘贴成功',
      silent: true
    });

    myNotification.onclick = () => {
      console.log('通知被点击');
      myNotification.close();
    };
  });
});
