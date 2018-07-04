import * as R from 'ramda'
import React from 'react'
import Route from 'route-parser'

import Router from '../router/router'
import LandingView from '../landing/landingView'
import OriginalDataPointView from '../originalDataPoint/originalDataPointView'
import OriginalDataListView from '../originalDataPoint/originalDataListView'
import ExtentOfForestView from '../assessmentFra/extentOfForest/extentOfForestView'
import GrowingStockView from '../assessmentFra/growingStock/growingStockView'
import SpecificForestCategoriesView from '../assessmentFra/specificForestCategories/specificForestCategoriesView'
import GrowingStockCompositionView from '../assessmentFra/growingStockComposition/growingStockCompositionView'
import designatedManagementObjectiveView
  from '../assessmentFra/designatedManagementObjective/designatedManagementObjectiveView'
import ForestAreaChangeView from '../assessmentFra/forestAreaChange/forestAreaChangeView'
import AreaAffecteByFireView from '../assessmentFra/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '../assessmentFra/degradedForest/degradedForestView'
import EmploymentView from '../assessmentFra/employment/employmentView'
import GraduationOfStudentsView from '../assessmentFra/graduationOfStudents/graduationOfStudentsView'
import ForestCharacteristicsView from '../assessmentFra/forestCharacteristics/forestCharacteristicsView'
import NonWoodForestProductsRemovalsView
  from '../assessmentFra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'
import AnnualReforestationView from '../assessmentFra/annualReforestation/annualReforestationView'
import BiomassStockView from '../assessmentFra/biomassStock/biomassStockView'
import CarbonStockView from '../assessmentFra/carbonStock/carbonStockView'
import ForestOwnershipView from '../assessmentFra/forestOwnership/forestOwnershipView'
import ForestAreaWithinProtectedAreasView
  from '../assessmentFra/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'
import HolderOfManagementRightsView from '../assessmentFra/holderOfManagementRights/holderOfManagementRightsView'
import DisturbancesView from '../assessmentFra/disturbances/disturbancesView'
import AreaOfPermanentForestEstateView
  from '../assessmentFra/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'
import ForestPolicyView from '../assessmentFra/forestPolicy/forestPolicyView'
import OtherLandWithTreeCoverView from '../assessmentFra/otherLandWithTreeCover/otherLandWithTreeCoverView'
import SustainableDevelopmentView from '../assessmentFra/sustainableDevelopment/sustainableDevelopmentView'
import ContactPersonsView from '../assessmentFra/contactPersons/contactPersonsView'
import PanEuropeanIndicatorsView from '../panEuropeanIndicators/panEuropeanIndicatorsView'
import EditUserView from '../userManagement/editUserView'
import PrintAssessmentView from '../printAssessment/printAssessmentView'
import AdminView from '../admin/adminView'

const routes = {
  '/': () => <noscript/>, //This will get rendered first (it flashes), before we redirect to logged-in page or login page
  '/version': () => <span>{__PLATFORM_VERSION__}</span>,
  '/country/:countryIso/admin': AdminView,
  '/country/:countryIso': LandingView,
  '/country/:countryIso/odps': OriginalDataListView,
  '/country/:countryIso/odp/:tab': OriginalDataPointView,
  '/country/:countryIso/odp/:tab/:odpId': OriginalDataPointView,
  '/country/:countryIso/extentOfForest': ExtentOfForestView,
  '/country/:countryIso/growingStock': GrowingStockView,
  '/country/:countryIso/specificForestCategories': SpecificForestCategoriesView,
  '/country/:countryIso/growingStockComposition': GrowingStockCompositionView,
  '/country/:countryIso/forestAreaChange': ForestAreaChangeView,
  '/country/:countryIso/forestCharacteristics': ForestCharacteristicsView,
  '/country/:countryIso/designatedManagementObjective': designatedManagementObjectiveView,
  '/country/:countryIso/areaAffectedByFire': AreaAffecteByFireView,
  '/country/:countryIso/degradedForest': DegradedForestView,
  '/country/:countryIso/employment': EmploymentView,
  '/country/:countryIso/graduationOfStudents': GraduationOfStudentsView,
  '/country/:countryIso/nonWoodForestProductsRemovals': NonWoodForestProductsRemovalsView,
  '/country/:countryIso/annualReforestation': AnnualReforestationView,
  '/country/:countryIso/biomassStock': BiomassStockView,
  '/country/:countryIso/carbonStock': CarbonStockView,
  '/country/:countryIso/forestOwnership': ForestOwnershipView,
  '/country/:countryIso/forestAreaWithinProtectedAreas': ForestAreaWithinProtectedAreasView,
  '/country/:countryIso/holderOfManagementRights': HolderOfManagementRightsView,
  '/country/:countryIso/disturbances': DisturbancesView,
  '/country/:countryIso/areaOfPermanentForestEstateView': AreaOfPermanentForestEstateView,
  '/country/:countryIso/forestPolicy': ForestPolicyView,
  '/country/:countryIso/otherLandWithTreeCover': OtherLandWithTreeCoverView,
  '/country/:countryIso/sustainableDevelopment': SustainableDevelopmentView,
  '/country/:countryIso/contactPersons': ContactPersonsView,
  '/country/:countryIso/panEuropeanIndicators': PanEuropeanIndicatorsView,
  '/country/:countryIso/user/:userId': EditUserView,
  '/country/:countryIso/print/:assessment': PrintAssessmentView
}

const routeConfig = R.pipe(
  R.keys,
  R.map(k => ({route: new Route(k), component: routes[k]}))
)(routes)

export default ({path}) => <Router path={path} routes={routeConfig}/>
