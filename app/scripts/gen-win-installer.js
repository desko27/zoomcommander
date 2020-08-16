const path = require('path')
const { MSICreator } = require('electron-wix-msi')

const { version } = require('../package.json')

const msiCreator = new MSICreator({
  appDirectory: path.resolve(__dirname, '../OutAppWin32/zoomcommander-win32-ia32'),
  outputDirectory: path.resolve(__dirname, '../OutAppWin32Installer'),
  description: 'Zoom Commander',
  exe: 'zoomcommander',
  name: 'ZoomCommander',
  manufacturer: 'Desko27',
  version,
  appIconPath: path.resolve(__dirname, '../public/icon.ico')
})

// 4. Create a .wxs template file
msiCreator.create().then(function () {
  // Step 5: Compile the template to a .msi file
  msiCreator.compile()
})
