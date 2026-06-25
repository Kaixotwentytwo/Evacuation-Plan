import { contextBridge } from 'electron';

// Здесь можно безопасно экспортировать API в renderer
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform
});