import { useEffect } from 'react'

const { ipcRenderer } = window.require('electron')

export default function useShortcuts (eventHandlers, dependecies = []) {
  useEffect(() => {
    const globalShortcutListener = (event, payload) => {
      const eventHandler = eventHandlers[payload.action]
      if (eventHandler) eventHandler(payload)
    }
    ipcRenderer.on('global-shortcut', globalShortcutListener)
    return () => {
      ipcRenderer.removeListener('global-shortcut', globalShortcutListener)
    }
  }, [])
}
