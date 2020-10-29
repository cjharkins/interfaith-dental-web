import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Public from './pages/public'
import Admin from './pages/admin'
import PrivateRoute from './utils/privateRoute'

interface AppProps {
  path?: String | undefined
  exact?: boolean | undefined
}

const App: FC<AppProps> = (props): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Public} />
        <PrivateRoute exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  )
}

export default App
