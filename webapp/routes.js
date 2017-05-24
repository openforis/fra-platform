import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'

import Header from './header/header'
import Footer from './footer/footer'
import ErrorComponent from './applicationError/errorComponent'
import Router from './router/router'

import DefaultView from './default'
import NationalDataEntryView from './nationalDataEntry/nationalDataEntryView'
import OriginalDataPointView from './originalDataPoint/originalDataPointView'

const routes = {
  '/': DefaultView,
  '#/': DefaultView,
  '#/country/:countryIso': NationalDataEntryView,
  '#/country/odp/:countryIso': OriginalDataPointView,
  '#/country/odp/:countryIso/:odpId': OriginalDataPointView
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
