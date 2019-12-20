import LandingView from '../landing/landingView'
import OriginalDataPointView from '../originalDataPoint/originalDataPointView'
import OriginalDataListView from '../originalDataPoint/originalDataListView'
import ExtentOfForestView from '@webapp/assessmentFra/extentOfForest/extentOfForestView'
import GrowingStockView from '@webapp/assessmentFra/growingStock/growingStockView'
import SpecificForestCategoriesView from '@webapp/assessmentFra/specificForestCategories/specificForestCategoriesView'
import GrowingStockCompositionView from '@webapp/assessmentFra/growingStockComposition/growingStockCompositionView'
import designatedManagementObjectiveView
  from '@webapp/assessmentFra/designatedManagementObjective/designatedManagementObjectiveView'
import ForestAreaChangeView from '@webapp/assessmentFra/forestAreaChange/forestAreaChangeView'
import AreaAffecteByFireView from '@webapp/assessmentFra/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '@webapp/assessmentFra/degradedForest/degradedForestView'
import EmploymentView from '@webapp/assessmentFra/employment/employmentView'
import GraduationOfStudentsView from '@webapp/assessmentFra/graduationOfStudents/graduationOfStudentsView'
import ForestCharacteristicsView from '@webapp/assessmentFra/forestCharacteristics/forestCharacteristicsView'
import NonWoodForestProductsRemovalsView
  from '@webapp/assessmentFra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'
import AnnualReforestationView from '@webapp/assessmentFra/annualReforestation/annualReforestationView'
import BiomassStockView from '@webapp/assessmentFra/biomassStock/biomassStockView'
import CarbonStockView from '@webapp/assessmentFra/carbonStock/carbonStockView'
import ForestOwnershipView from '@webapp/assessmentFra/forestOwnership/forestOwnershipView'
import ForestAreaWithinProtectedAreasView
  from '@webapp/assessmentFra/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'
import HolderOfManagementRightsView from '@webapp/assessmentFra/holderOfManagementRights/holderOfManagementRightsView'
import DisturbancesView from '@webapp/assessmentFra/disturbances/disturbancesView'
import AreaOfPermanentForestEstateView
  from '@webapp/assessmentFra/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'
import ForestPolicyView from '@webapp/assessmentFra/forestPolicy/forestPolicyView'
import OtherLandWithTreeCoverView from '@webapp/assessmentFra/otherLandWithTreeCover/otherLandWithTreeCoverView'
import SustainableDevelopmentView from '@webapp/assessmentFra/sustainableDevelopment/sustainableDevelopmentView'
import ContactPersonsView from '@webapp/assessmentFra/contactPersons/contactPersonsView'
import PanEuropeanIndicatorsView from '../panEuropeanIndicators/panEuropeanIndicatorsView'
import EditUserView from '../userManagement/editUserView'
import AdminView from '../admin/adminView'
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
