import React from 'react'

import { Route, Switch } from 'react-router-dom'
import LoggedInView from '../loggedin/loggedInView'

const AppRouterSwitch = () => (
  <Switch>

    <Route path="/country/:countryIso/">
      <LoggedInView/>
    </Route>

  </Switch>
)

export default AppRouterSwitch


