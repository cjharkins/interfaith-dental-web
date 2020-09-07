import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Public from "./pages/public"
import Admin from "./pages/admin"

const App: FC = (props): JSX.Element => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Public}></Route>
        <Route exact path="/admin" component={Admin}></Route>
      </Switch>
    </Router>
  )
}

export default App
