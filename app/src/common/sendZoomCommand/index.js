const { ipcRenderer } = window.require('electron')

export default function sendZoomCommand (...args) {
  return ipcRenderer.invoke('zoom-command', ...args)
}
