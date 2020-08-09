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
  const WINDOW_WIDTH = 292
  const WINDOW_HEIGHT = 425
  const window = new BrowserWindow({
    title: 'Zoom Commander',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizable: false,
    fullscreenable: false,
    show: false,
    webPreferences: { nodeIntegration: true },
    acceptFirstMouse: true,
    backgroundColor: '#263342'
  })
  window.loadURL(getAppUrl('lobby'))
  window.on('closed', () => {
    app.quit()
  })
  return window
}

function adaptMainWindowToMeeting (window) {
  const WINDOW_WIDTH = 730
  const WINDOW_HEIGHT = 460
  window.resizable = true
  window.fullscreenable = true
  window.setSize(WINDOW_WIDTH, WINDOW_HEIGHT)
  window.setMinimumSize(WINDOW_WIDTH, WINDOW_HEIGHT)
}

/* function revertMainWindowToLobby (window) {
  const WINDOW_WIDTH = 292
  const WINDOW_HEIGHT = 425
  window.resizable = false
  window.fullscreenable = false
  window.setSize(WINDOW_WIDTH, WINDOW_HEIGHT)
  window.setMinimumSize(WINDOW_WIDTH, WINDOW_HEIGHT)
} */

app.on('ready', async () => {
  const mainWindow = createMainWindow()

  /* function goBackToLobby () {
    mainWindow.loadURL(getAppUrl('lobby'))
    revertMainWindowToLobby(mainWindow)
  } */

  // only show when react render is ready
  ipcMain.once('main-window-ready', () => mainWindow.show())

  // listen to start meeting event
  ipcMain.once('lobby-starts-meeting', (event, data) => {
    const { username, meetingID, meetingPassword } = data
    global.zoomUsername = username
    global.zoomMeetingID = meetingID
    global.zoomMeetingPassword = meetingPassword
    startMeeting()
  })

  // prepare meeting setup so it can be triggered if user moves forward
  async function startMeeting () {
    adaptMainWindowToMeeting(mainWindow)

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

    // send window events
    mainWindow.on('focus', () => {
      mainWindow.webContents.send('window-event', { name: 'focus' })
    })
    mainWindow.on('blur', () => {
      mainWindow.webContents.send('window-event', { name: 'blur' })
    })
  }
})
