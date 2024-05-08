'use strict';

var electron = require('electron');

electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, args) => electron.ipcRenderer.send(channel, args),
  sendSync: (channel, args) => electron.ipcRenderer.sendSync(channel, args),
  on: (channel, listener) => electron.ipcRenderer.on(channel, listener),
  once: (channel, listener) => electron.ipcRenderer.once(channel, listener),
  invoke: (channel, args) => electron.ipcRenderer.invoke(channel, args),
  removeAllListeners: (channel) => electron.ipcRenderer.removeAllListeners(channel)
});
console.log("preloaded!");
