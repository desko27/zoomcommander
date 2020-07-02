import { useEffect } from 'react'

const { ipcRenderer } = window.require('electron')

export default function useZoomEvents (eventHandlers, dependecies = []) {
  useEffect(() => {
    const zoomEventsListener = (event, eventName, eventData) => {
      const eventHandler = eventHandlers[eventName]
      if (eventHandler) eventHandler(eventData)
    }
    ipcRenderer.on('zoom-event', zoomEventsListener)
    return () => {
      ipcRenderer.removeListener('zoom-event', zoomEventsListener)
    }
  }, dependecies)
}
