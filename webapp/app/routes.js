import * as BasePaths from '@webapp/main/basePaths'

import ExtentOfForestView from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestView'
import GrowingStockView from '@webapp/app/assessment/fra/sections/growingStock/growingStockView'
import SpecificForestCategoriesView from '@webapp/app/assessment/fra/sections/specificForestCategories/specificForestCategoriesView'
import GrowingStockCompositionView from '@webapp/app/assessment/fra/sections/growingStockComposition/growingStockCompositionView'
import designatedManagementObjectiveView from '@webapp/app/assessment/fra/sections/designatedManagementObjective/designatedManagementObjectiveView'
import ForestAreaChangeView from '@webapp/app/assessment/fra/sections/forestAreaChange/forestAreaChangeView'
import AreaAffecteByFireView from '@webapp/app/assessment/fra/sections/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '@webapp/app/assessment/fra/sections/degradedForest/degradedForestView'
import EmploymentView from '@webapp/app/assessment/fra/sections/employment/employmentView'
import GraduationOfStudentsView from '@webapp/app/assessment/fra/sections/graduationOfStudents/graduationOfStudentsView'
import ForestCharacteristicsView from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsView'
import NonWoodForestProductsRemovalsView from '@webapp/app/assessment/fra/sections/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'
import AnnualReforestationView from '@webapp/app/assessment/fra/sections/annualReforestation/annualReforestationView'
import BiomassStockView from '@webapp/app/assessment/fra/sections/biomassStock/biomassStockView'
import CarbonStockView from '@webapp/app/assessment/fra/sections/carbonStock/carbonStockView'
import ForestOwnershipView from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipView'
import ForestAreaWithinProtectedAreasView from '@webapp/app/assessment/fra/sections/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'
import HolderOfManagementRightsView from '@webapp/app/assessment/fra/sections/holderOfManagementRights/holderOfManagementRightsView'
import DisturbancesView from '@webapp/app/assessment/fra/sections/disturbances/disturbancesView'
import AreaOfPermanentForestEstateView from '@webapp/app/assessment/fra/sections/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'
import ForestPolicyView from '@webapp/app/assessment/fra/sections/forestPolicy/forestPolicyView'
import OtherLandWithTreeCoverView from '@webapp/app/assessment/fra/sections/otherLandWithTreeCover/otherLandWithTreeCoverView'
import SustainableDevelopmentView from '@webapp/app/assessment/fra/sections/sustainableDevelopment/sustainableDevelopmentView'
import ContactPersonsView from '@webapp/app/assessment/fra/sections/contactPersons/contactPersonsView'
import AdminView from '@webapp/app/admin/adminView'
import NotFound from '@webapp/app/notfound'
import AssessmentSectionView from '@webapp/app/assessment/components/section/assessmentSectionView'
import EditUserView from './user/userManagement/editUserView'
import PanEuropeanIndicatorsView from './assessment/panEuropean/sections/indicators/panEuropeanIndicatorsView'
import OriginalDataListView from './assessment/fra/sections/originalDataPoint/originalDataListView'
import OriginalDataPointView from './assessment/fra/sections/originalDataPoint/originalDataPointView'
import LandingView from './landing/landingView'

const routes = [
  { path: BasePaths.assessmentSection, component: AssessmentSectionView },

  // === Routes to be removed or updated
  { path: '/country/:countryIso/admin/', component: AdminView },
  { path: '/country/:countryIso/odps/', component: OriginalDataListView },
  { path: '/country/:countryIso/odp/:tab/:odpId/', component: OriginalDataPointView },
  { path: '/country/:countryIso/odp/:tab/', component: OriginalDataPointView },
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
  // === End Routes to be removed or updated

  { path: [BasePaths.root, BasePaths.country], component: LandingView },
]

export default routes
