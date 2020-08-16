import { MSICreator } from 'electron-wix-msi'
import { version } from '../package.json'

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: '../OutAppWin32',
  description: 'Zoom Commander',
  exe: 'zoomcommander',
  name: 'ZoomCommander',
  manufacturer: 'Desko27',
  version,
  outputDirectory: '../OutAppWin32Installer'
})

// Step 2: Create a .wxs template file
msiCreator.create().then(
  // Step 3: Compile the template to a .msi file
  () => msiCreator.compile()
)
