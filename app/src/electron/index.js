const { app, BrowserWindow, ipcMain, Menu, globalShortcut } = require('electron')
const { windowManager } = require('node-window-manager')
const path = require('path')
const isDev = require('electron-is-dev')

const zoomMeetingControllerFactory = require('./zoom')

// remove browser's menu bar for production env
if (!isDev) Menu.setApplicationMenu(false)

function getAppUrl (route) {
  return isDev
    ? `http://localhost:3000/#${route}`
    : `file://${path.join(__dirname, '../build/index.html')}#/${route}`
}

function createMainWindow () {
  const WINDOW_WIDTH = 730
  const WINDOW_HEIGHT = 460
  const window = new BrowserWindow({
    title: 'Zoom Commander',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    minWidth: WINDOW_WIDTH,
    minHeight: WINDOW_HEIGHT,
    show: false,
    webPreferences: { nodeIntegration: true }
  })
  window.loadURL(getAppUrl('waiting'))
  window.on('closed', () => {
    app.quit()
  })
  return window
}

app.on('ready', async () => {
  const mainWindow = createMainWindow()

  // only show when react render is ready
  ipcMain.once('main-window-ready', () => mainWindow.show())

  // join zoom meeting
  const zoomMeeting = await zoomMeetingControllerFactory({
    app,
    events: {
      onJoined: () => mainWindow.webContents.send('zoom-event', 'MEETING_JOINED'),
      onUserJoined: user => mainWindow.webContents.send('zoom-event', 'USER_JOINED', user),
      onUserLeft: user => mainWindow.webContents.send('zoom-event', 'USER_LEFT', user),
      onUserAudioStatusChange: data => mainWindow.webContents.send('zoom-event', 'USER_AUDIO_STATUS_CHANGE', data),
      onUserVideoStatusChange: data => mainWindow.webContents.send('zoom-event', 'USER_VIDEO_STATUS_CHANGE', data),
      onLowOrRaiseHandStatusChanged: data => mainWindow.webContents.send('zoom-event', 'ON_LOW_OR_RAISE_HAND_STATUS_CHANGED', data)
    }
  })

  // listen to zoom commands
  ipcMain.handle('zoom-command', (event, command, ...args) => {
    return zoomMeeting.commands[command](...args)
  })

  // listen to window id requests
  ipcMain.handle('request-windows-list', (event, queryString) => {
    const windowsList = windowManager.getWindows()
    const foundWindows = windowsList.filter(({ path }) => path.includes(queryString))
    const foundWindowsWithTitle =
    foundWindows.map(window => ({ id: window.id, title: window.getTitle() }))
    return foundWindowsWithTitle
  })

  const GLOBAL_SHORTCUTS = {
    'Alt+Shift+A': { action: 'startAppShare' },
    'Alt+Shift+0': { action: 'stopShare' }
  }

  // register shortcuts
  Object.entries(GLOBAL_SHORTCUTS).forEach(([key, value]) => {
    globalShortcut.register(key, () => mainWindow.webContents.send('global-shortcut', value))
  })
})
