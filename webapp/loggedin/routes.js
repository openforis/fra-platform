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

const routes = [
  { path: '/country/:countryIso/', component: LandingView },
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
  { path: '/country/:countryIso/print/:assessment/', component: PrintAssessmentView }
]

export default routes
