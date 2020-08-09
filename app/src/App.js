import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import LobbyRoute from './routes/LobbyRoute'
import WaitingRoute from './routes/WaitingRoute'
import MainRoute from './routes/MainRoute'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/lobby'>
          <LobbyRoute />
        </Route>
        <Route path='/waiting'>
          <WaitingRoute />
        </Route>
        <Route path='/main'>
          <MainRoute />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
