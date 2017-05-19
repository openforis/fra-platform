import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'

import Header from './header/header'
import Footer from './footer/footer'
import ErrorComponent from './applicationError/errorComponent'
import Router from './router/router'

import Login from './login/login'
import NationalDataEntry from './nationalDataEntry/nationalDataEntry'
import OriginalDataPoint from './originalDataPoint/originalDataPoint'

const routes = {
  '/': Login,
  '#/': Login,
  '#/country/:countryIso': NationalDataEntry,
  '#/country/odp/:countryIso': OriginalDataPoint,
  '#/country/odp/:countryIso/:odpId': OriginalDataPoint
}

const routeConfig = R.pipe(
  R.keys,
  R.map(k => ({route: new Route(k), component: routes[k]}))
)(routes)

export default ({path}) => {
  return <div className="app__root">
    <Header/>
    <ErrorComponent/>
    <div className="fra-routes__container">
      <Router path={path} routes={routeConfig}/>
    </div>
    <Footer/>
  </div>
}
