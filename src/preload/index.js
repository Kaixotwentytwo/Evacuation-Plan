"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Здесь можно безопасно экспортировать API в renderer
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    platform: process.platform
});
