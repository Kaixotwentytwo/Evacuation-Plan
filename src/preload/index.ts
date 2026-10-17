import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  
  // Добавляем новые мосты для общения с главным процессом
  saveKeybinds: (data: Record<string, string>) => ipcRenderer.invoke('save-keybinds', data),
  loadKeybinds: () => ipcRenderer.invoke('load-keybinds'),
});
