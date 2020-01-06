import LandingView from '../landing/landingView'
import OriginalDataPointView from '../originalDataPoint/originalDataPointView'
import OriginalDataListView from '../originalDataPoint/originalDataListView'
import ExtentOfForestView from '@webapp/loggedin/assessmentFra/extentOfForest/extentOfForestView'
import GrowingStockView from '@webapp/loggedin/assessmentFra/growingStock/growingStockView'
import SpecificForestCategoriesView from '@webapp/loggedin/assessmentFra/specificForestCategories/specificForestCategoriesView'
import GrowingStockCompositionView from '@webapp/loggedin/assessmentFra/growingStockComposition/growingStockCompositionView'
import designatedManagementObjectiveView
  from '@webapp/loggedin/assessmentFra/designatedManagementObjective/designatedManagementObjectiveView'
import ForestAreaChangeView from '@webapp/loggedin/assessmentFra/forestAreaChange/forestAreaChangeView'
import AreaAffecteByFireView from '@webapp/loggedin/assessmentFra/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '@webapp/loggedin/assessmentFra/degradedForest/degradedForestView'
import EmploymentView from '@webapp/loggedin/assessmentFra/employment/employmentView'
import GraduationOfStudentsView from '@webapp/loggedin/assessmentFra/graduationOfStudents/graduationOfStudentsView'
import ForestCharacteristicsView from '@webapp/loggedin/assessmentFra/forestCharacteristics/forestCharacteristicsView'
import NonWoodForestProductsRemovalsView
  from '@webapp/loggedin/assessmentFra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'
import AnnualReforestationView from '@webapp/loggedin/assessmentFra/annualReforestation/annualReforestationView'
import BiomassStockView from '@webapp/loggedin/assessmentFra/biomassStock/biomassStockView'
import CarbonStockView from '@webapp/loggedin/assessmentFra/carbonStock/carbonStockView'
import ForestOwnershipView from '@webapp/loggedin/assessmentFra/forestOwnership/forestOwnershipView'
import ForestAreaWithinProtectedAreasView
  from '@webapp/loggedin/assessmentFra/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'
import HolderOfManagementRightsView from '@webapp/loggedin/assessmentFra/holderOfManagementRights/holderOfManagementRightsView'
import DisturbancesView from '@webapp/loggedin/assessmentFra/disturbances/disturbancesView'
import AreaOfPermanentForestEstateView
  from '@webapp/loggedin/assessmentFra/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'
import ForestPolicyView from '@webapp/loggedin/assessmentFra/forestPolicy/forestPolicyView'
import OtherLandWithTreeCoverView from '@webapp/loggedin/assessmentFra/otherLandWithTreeCover/otherLandWithTreeCoverView'
import SustainableDevelopmentView from '@webapp/loggedin/assessmentFra/sustainableDevelopment/sustainableDevelopmentView'
import ContactPersonsView from '@webapp/loggedin/assessmentFra/contactPersons/contactPersonsView'
import PanEuropeanIndicatorsView from '../panEuropeanIndicators/panEuropeanIndicatorsView'
import EditUserView from '../userManagement/editUserView'
import AdminView from '@webapp/loggedin/admin/adminView'
import NotFound from '@webapp/app/notfound'

const routes = [
  { path: '/country/:countryIso/admin/', component: AdminView },
  { path: '/country/:countryIso/odps/', component: OriginalDataListView },
  { path: '/country/:countryIso/odp/:tab/', component: OriginalDataPointView },
  { path: '/country/:countryIso/odp/:tab/:odpId/', component: OriginalDataPointView },
  { path: '/country/:countryIso/extentOfForest/', component: ExtentOfForestView },
  { path: '/country/:countryIso/growingStock/', component: GrowingStockView },
  { path: '/country/:countryIso/specificForestCategories/', component: SpecificForestCategoriesView },
  { path: '/country/:countryIso/growingStockComposition/', component: GrowingStockCompositionView },
  { path: '/country/:countryIso/forestAreaChange/', component: ForestAreaChangeView },
  { path: '/country/:countryIso/forestCharacteristics/', component: ForestCharacteristicsView },
  { path: '/country/:countryIso/designatedManagementObjective/', component: designatedManagementObjectiveView },
  { path: '/country/:countryIso/areaAffectedByFire/', component: AreaAffecteByFireView },
  { path: '/country/:countryIso/degradedForest/', component: DegradedForestView },
  { path: '/country/:countryIso/employment/', component: EmploymentView },
  { path: '/country/:countryIso/graduationOfStudents/', component: GraduationOfStudentsView },
  { path: '/country/:countryIso/nonWoodForestProductsRemovals/', component: NonWoodForestProductsRemovalsView },
  { path: '/country/:countryIso/annualReforestation/', component: AnnualReforestationView },
  { path: '/country/:countryIso/biomassStock/', component: BiomassStockView },
  { path: '/country/:countryIso/carbonStock/', component: CarbonStockView },
  { path: '/country/:countryIso/forestOwnership/', component: ForestOwnershipView },
  { path: '/country/:countryIso/forestAreaWithinProtectedAreas/', component: ForestAreaWithinProtectedAreasView },
  { path: '/country/:countryIso/holderOfManagementRights/', component: HolderOfManagementRightsView },
  { path: '/country/:countryIso/disturbances/', component: DisturbancesView },
  { path: '/country/:countryIso/areaOfPermanentForestEstateView/', component: AreaOfPermanentForestEstateView },
  { path: '/country/:countryIso/forestPolicy/', component: ForestPolicyView },
  { path: '/country/:countryIso/otherLandWithTreeCover/', component: OtherLandWithTreeCoverView },
  { path: '/country/:countryIso/sustainableDevelopment/', component: SustainableDevelopmentView },
  { path: '/country/:countryIso/contactPersons/', component: ContactPersonsView },
  { path: '/country/:countryIso/panEuropeanIndicators/', component: PanEuropeanIndicatorsView },
  { path: '/country/:countryIso/user/:userId/', component: EditUserView },
  { path: '/country/:countryIso/', component: LandingView },
  { path: '/country/:countryIso/*', component: NotFound },
]

export default routes
