import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'
import Router from './router/router'
import NationalDataEntryView from './nationalDataEntry/nationalDataEntryView'
import GrowingStockView from './growingStock/growingStockView'
import OriginalDataPointView from './originalDataPoint/originalDataPointView'
import SpecificForestCategoriesView from './specificForestCategories/specificForestCategoriesView'
import GrowingStockCompositionView from './growingStockComposition/growingStockCompositionView'
import PrimaryDesignatedManagementObjectiveView from './primaryDesignatedManagementObjective/primaryDesignatedManagementObjectiveView'
import OriginalDataListView from './originalDataPoint/originalDataListView'
import ForestAreaChangeView from './forestAreaChange/forestAreaChangeView'
import AreaAffecteByFireView from './areaAffectedByFire/areaAffectedByFireView'
import ForestCharacteristicsView from './forestCharacteristics/forestCharacteristicsView'
import NonWoodForestProductsRemovalsView from './nonWoodForestProductsRemovals/nonWoodForestProductsRemovals'

const routes = {
  '/': () => <noscript/>, //This will get rendered first (it flashes), before we redirect to logged-in page or login page
  '/country/:countryIso/odps': OriginalDataListView,
  '/country/:countryIso/odp': OriginalDataPointView,
  '/country/:countryIso/odp/:odpId': OriginalDataPointView,
  '/country/:countryIso': NationalDataEntryView,
  '/country/:countryIso/growingStock': GrowingStockView,
  '/country/:countryIso/specificForestCategories': SpecificForestCategoriesView,
  '/country/:countryIso/growingStockComposition': GrowingStockCompositionView,
  '/country/:countryIso/forestAreaChange': ForestAreaChangeView,
  '/country/:countryIso/forestCharacteristics': ForestCharacteristicsView,
  '/country/:countryIso/primaryDesignatedManagementObjectiveView': PrimaryDesignatedManagementObjectiveView,
  '/country/:countryIso/areaAffectedByFire': AreaAffecteByFireView,
  '/country/:countryIso/nonWoodForestProductsRemovals': NonWoodForestProductsRemovalsView,
}

const routeConfig = R.pipe(
  R.keys,
  R.map(k => ({route: new Route(k), component: routes[k]}))
)(routes)

export default ({path}) => <Router path={path} routes={routeConfig}/>
