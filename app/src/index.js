import React from 'react'
import ReactDOM from 'react-dom'
import vex from 'vex-js'
import vexDialog from 'vex-dialog'

import App from './App'

// libs css
import 'vex-js/dist/css/vex.css'
import 'vex-js/dist/css/vex-theme-top.css'

// global css
import './vars.css'
import './index.css'

// setup vex dialogs
vex.registerPlugin(vexDialog)
vex.defaultOptions.className = 'vex-theme-top'

ReactDOM.render(<App />, document.getElementById('root'))
