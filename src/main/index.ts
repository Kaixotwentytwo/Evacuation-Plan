import { interfaceElements } from '../renderer/config/lang';
import { Variables } from '../renderer/config/Variables';
const IE = interfaceElements;

// Hot reload
const devFunctional = true;
if (devFunctional) {
  try {
    require('electron-reloader')(module, {
      watchRenderer: false
    });
  } catch {}
}

import { app, BrowserWindow, ipcMain, Menu, MenuItem, MenuItemConstructorOptions } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: BrowserWindow | null = null;

const configPath = path.join(app.getPath('userData'), 'keybinds.json');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  
  mainWindow.on('closed', () => {mainWindow = null;});
}

ipcMain.handle('save-keybinds', async (event, data) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-keybinds', async () => {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    return null;
  }
});

function createAppMenu(language: string) {
  const languageIndex: number = (language=='en') ? 1 : 0;
  const template: MenuItemConstructorOptions[] = [

    { // file menu
      label: IE.OSUI.file.self[languageIndex],
      submenu: [
        { // open file
          label: IE.OSUI.file.open[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:open-file')},
          accelerator: 'Ctrl+O',
        },

        { // save file
          label: IE.OSUI.file.save[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:save-file')},
          accelerator: 'Ctrl+S',
          enabled: false
        },

        { // export
          label: IE.OSUI.file.export[languageIndex],
          // open popup where needs to choose which format export to
          click: () => {mainWindow?.webContents.send('native-menu:export-file')},
          accelerator: 'Ctrl+I',
          enabled: false
        },

        {type: 'separator'},

        { // close
          label: IE.OSUI.file.close[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:close-file')},
          accelerator: 'Ctrl+W',
          enabled: false
        }
      ],
    },

    { // edit menu
      label: IE.OSUI.edit.self[languageIndex],
      submenu: [
        
        { // select all
          label: IE.OSUI.edit.selectAll[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:select-all')},
          accelerator: 'Ctrl+A',
        },

        { // select class
          label: IE.OSUI.edit.selectClass[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:select-class')},
          // accelerator: 'Alt+A',
        },

        {type: 'separator'},

        { // undo
          label: IE.OSUI.edit.undo[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:undo')},
          accelerator: 'Ctrl+Z',
          enabled: false,
        },

        { // redo
          label: IE.OSUI.edit.redo[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:redo')},
          accelerator: 'Ctrl+Y',
          enabled: false,
        },

        { // cut
          label: IE.OSUI.edit.cut[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:cut')},
          accelerator: 'Ctrl+X',
          enabled: false,
        },

        { // copy
          label: IE.OSUI.edit.copy[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:copy')},
          accelerator: 'Ctrl+C',
          enabled: false,
        },

        { // paste
          label: IE.OSUI.edit.paste[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:paste')},
          accelerator: 'Ctrl+V',
          enabled: false,
        },

        { // duplicate
          label: IE.OSUI.edit.duplicate[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:duplicate')},
          accelerator: 'Ctrl+D',
          enabled: false,
        },

        {type: 'separator'},

        { // delete
          label: IE.OSUI.edit.delete[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:delete')},
          accelerator: 'Delete',
          enabled: false,
        }
      ]
    },

    { // view menu
      label: IE.OSUI.view.self[languageIndex],
      submenu: [

        { // full screen
          label: IE.OSUI.view.fullscreen[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:fullscreen')},
          accelerator: 'F11',
          role: 'togglefullscreen',
        },

        {type: 'separator'},

        { // zoom in
          label: IE.OSUI.view.zoomIn[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:zoom-in')},
          accelerator: 'Ctrl+[',
          enabled: true,
          role:'zoomIn'
        },

        { // zoom out
          label: IE.OSUI.view.zoomOut[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:zoom-out')},
          accelerator: 'Ctrl+]',
          enabled: true,
          role:'zoomOut'
        },

        { // zoom in
          label: IE.OSUI.view.actualSize[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:reset-zoom')},
          accelerator: 'Shift+0',
          enabled: true,
          role: 'resetZoom',
        },

        {type: 'separator'},

        {
          label: IE.OSUI.view.appearence[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:open-appearence')},
        },

      ]
    },

    { // window menu

      label: IE.OSUI.window.self[languageIndex],
      submenu: [
        {
          label: IE.OSUI.window.minimize[languageIndex],
          role: 'minimize',
        },

        { // reload button
          label: IE.OSUI.window.reload[languageIndex],
          role: 'forceReload',
          accelerator: 'Ctrl+R',
          visible: devFunctional ? true : false,
        },

        { // dev tools
          label: IE.OSUI.window.devTools[languageIndex],
          role: 'toggleDevTools',
          visible: devFunctional ? true : false,
        },

        {type: 'separator'},

        {
          label: IE.OSUI.window.exit[languageIndex],
          role: 'quit'
        }
      ]

    },

    { // help menu
      label: IE.OSUI.help.self[languageIndex],
      submenu: [

        { // guide
          label: IE.OSUI.help.guide[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:guide')},
        },

        { // about
          label: IE.OSUI.help.about[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:about')},
          role: 'about',
        },

        { // license
          label: IE.OSUI.help.license[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:license')},
        },

        { // documentation
          label: IE.OSUI.help.documentation[languageIndex],
          click: () => {mainWindow?.webContents.send('native-menu:documentation')},
        }

      ]
    },

  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(()=>{
  createWindow();
  createAppMenu(new Variables().language);
});
app.on('window-all-closed', () => {app.quit();});