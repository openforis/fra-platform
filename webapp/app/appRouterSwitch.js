import React from 'react'

import { Route, Switch } from 'react-router-dom'
import CountryView from '../country/countryView'

const AppRouterSwitch = () => (
  <Switch>

    <Route path="/country/:countryIso/">
      <CountryView/>
    </Route>

  </Switch>
)

export default AppRouterSwitch


