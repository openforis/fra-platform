import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'
import Router from './router/router'
import LoginView from './login/login'
import NationalDataEntryView from './nationalDataEntry/nationalDataEntryView'
import OriginalDataPointView from './originalDataPoint/originalDataPointView'
import SpecificForestCategoriesView from './specificForestCategories/specificForestCategoriesView'

const routes = {
  '/': LoginView,
  '/country/:countryIso': NationalDataEntryView,
  '/country/:countryIso/odp': OriginalDataPointView,
  '/country/:countryIso/odp/:odpId': OriginalDataPointView,
  '/country/:countryIso/specificForestCategories': SpecificForestCategoriesView
}

const routeConfig = R.pipe(
  R.keys,
  R.map(k => ({route: new Route(k), component: routes[k]}))
)(routes)

export default ({path}) => <Router path={path} routes={routeConfig}/>
