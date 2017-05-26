import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'

import Header from './navigation/navigation'
import Footer from './footer/footer'
import ErrorComponent from './applicationError/errorComponent'
import Router from './router/router'

import LoginView from './login/login'
import NationalDataEntryView from './nationalDataEntry/nationalDataEntryView'
import OriginalDataPointView from './originalDataPoint/originalDataPointView'

const routes = {
  '/': LoginView,
  '#/': LoginView,
  '#/country/:countryIso': NationalDataEntryView,
  '#/country/:countryIso/odp': OriginalDataPointView,
  '#/country/:countryIso/odp/:odpId': OriginalDataPointView
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
