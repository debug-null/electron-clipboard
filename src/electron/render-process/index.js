import { ipcRenderer } from 'electron';
import store from '@/store';
ipcRenderer.on('cilpboard-post-text', (event, data) => {
  console.log('🚀 ~ file: index.js ~ line 4 ~ ipcRenderer.on ~ data', data);
  const myNotification = new Notification('通知', {
    body: '粘贴成功',
    silent: true
  });
  myNotification.onclick = () => {
    console.log('通知被点击');
    myNotification.close();
  };
  store.dispatch('addAll', data);
});
