import { useEffect } from 'react'

const { ipcRenderer } = window.require('electron')

export default function useWindowEvents (eventHandlers, dependecies = []) {
  useEffect(() => {
    const eventListener = (event, payload) => {
      const eventHandler = eventHandlers[payload.name]
      if (eventHandler) eventHandler(payload)
    }
    ipcRenderer.on('window-event', eventListener)
    return () => {
      ipcRenderer.removeListener('window-event', eventListener)
    }
  }, [])
}
