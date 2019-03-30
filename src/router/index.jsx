import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Index from '../pages/index'
import Detail from '../pages/Detail'

const BaseRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/detail" component={Detail} />
    </Switch>
  </HashRouter>
)

export default BaseRoute
