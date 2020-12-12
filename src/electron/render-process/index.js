import { ipcRenderer } from 'electron';
import store from '@/store';
ipcRenderer.on('cilpboard-post-text', (event, data) => {
  store.dispatch('addAll', data);
});
