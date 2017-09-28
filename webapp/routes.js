import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'
import Router from './router/router'
import NationalDataEntryView from './nationalDataEntry/nationalDataEntryView'
import GrowingStockView from './growingStock/growingStockView'
import OriginalDataPointView from './originalDataPoint/originalDataPointView'
import SpecificForestCategoriesView from './specificForestCategories/specificForestCategoriesView'
import GrowingStockCompositionView from './growingStockComposition/growingStockCompositionView'
import designatedManagementObjectiveView from './designatedManagementObjective/designatedManagementObjectiveView'
import OriginalDataListView from './originalDataPoint/originalDataListView'
import ForestAreaChangeView from './forestAreaChange/forestAreaChangeView'
import AreaAffecteByFireView from './areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from './degradedForest/degradedForestView'
import GraduationOfStudentsView from './graduationOfStudents/graduationOfStudentsView'
import ForestCharacteristicsView from './forestCharacteristics/forestCharacteristicsView'
import NonWoodForestProductsRemovalsView from './nonWoodForestProductsRemovals/nonWoodForestProductsRemovals'
import AnnualReforestationView from './annualReforestation/annualReforestationView'
import BiomassStockView from './biomassStock/biomassStockView'
import ForestOwnershipView from './forestOwnership/forestOwnershipView'
import ForestAreaWithinProtectedAreasView from './forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'
import DisturbancesView from './disturbances/disturbancesView'

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
  '/country/:countryIso/designatedManagementObjective': designatedManagementObjectiveView,
  '/country/:countryIso/areaAffectedByFire': AreaAffecteByFireView,
  '/country/:countryIso/degradedForest': DegradedForestView,
  '/country/:countryIso/graduationOfStudents': GraduationOfStudentsView,
  '/country/:countryIso/nonWoodForestProductsRemovals': NonWoodForestProductsRemovalsView,
  '/country/:countryIso/annualReforestation': AnnualReforestationView,
  '/country/:countryIso/biomassStock': BiomassStockView,
  '/country/:countryIso/forestOwnership': ForestOwnershipView,
  '/country/:countryIso/forestAreaWithinProtectedAreas': ForestAreaWithinProtectedAreasView,
  '/country/:countryIso/disturbances': DisturbancesView
}

const routeConfig = R.pipe(
  R.keys,
  R.map(k => ({route: new Route(k), component: routes[k]}))
)(routes)

export default ({path}) => <Router path={path} routes={routeConfig}/>
