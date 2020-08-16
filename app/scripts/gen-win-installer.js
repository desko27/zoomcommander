const path = require('path')
const electronInstaller = require('electron-winstaller')

const { version } = require('../package.json')

const absPath = relativePath => path.join(__dirname, relativePath)

async function genWinInstaller () {
  return electronInstaller.createWindowsInstaller({
    appDirectory: absPath('../OutAppWin32/zoomcommander-win32-ia32'),
    outputDirectory: absPath('../OutAppWin32Installer'),
    authors: 'Desko27',
    exe: 'zoomcommander.exe',
    setupIcon: absPath('../public/icon.ico'),
    setupExe: `ZoomCommander-Setup-v${version}.exe`,
    setupMsi: `ZoomCommander-Setup-v${version}.msi`
  })
}

genWinInstaller().then(() => console.log('Done!'))
