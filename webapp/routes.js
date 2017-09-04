import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'
import Router from './router/router'
import NationalDataEntryView from './nationalDataEntry/nationalDataEntryView'
import OriginalDataPointView from './originalDataPoint/originalDataPointView'
import SpecificForestCategoriesView from './specificForestCategories/specificForestCategoriesView'
import PrimaryDesignatedManagementObjectiveView from './primaryDesignatedManagementObjective/primaryDesignatedManagementObjectiveView'
import OriginalDataListView from './originalDataPoint/originalDataListView'
import ForestAreaChangeView from './forestAreaChange/forestAreaChangeView'
import AreaAffecteByFireView from './areaAffectedByFire/areaAffectedByFireView'
import ForestCharacteristicsView from './forestCharacteristics/forestCharacteristicsView'

const routes = {
  '/': () => <noscript/>, //This will get rendered first (it flashes), before we redirect to logged-in page or login page
  '/country/:countryIso/odps': OriginalDataListView,
  '/country/:countryIso': NationalDataEntryView,
  '/country/:countryIso/odp': OriginalDataPointView,
  '/country/:countryIso/odp/:odpId': OriginalDataPointView,
  '/country/:countryIso/specificForestCategories': SpecificForestCategoriesView,
  '/country/:countryIso/forestAreaChange': ForestAreaChangeView,
  '/country/:countryIso/forestCharacteristics': ForestCharacteristicsView,
  '/country/:countryIso/primaryDesignatedManagementObjectiveView': PrimaryDesignatedManagementObjectiveView,
  '/country/:countryIso/areaAffectedByFire': AreaAffecteByFireView
}

const routeConfig = R.pipe(
  R.keys,
  R.map(k => ({route: new Route(k), component: routes[k]}))
)(routes)

export default ({path}) => <Router path={path} routes={routeConfig}/>
