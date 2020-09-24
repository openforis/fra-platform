import * as BasePaths from '@webapp/main/basePaths'

import AdminView from '@webapp/app/admin/adminView'
import AssessmentSectionView from '@webapp/app/assessment/components/section/assessmentSectionView'
import EditUserView from './user/userManagement/editUserView'
import OriginalDataPointView from './assessment/fra/sections/originalDataPoint/originalDataPointView'
import CountryLandingView from './countryLanding/countryLandingView'
import Landing from './landing'

const routes = [
  { path: BasePaths.assessmentSection, component: AssessmentSectionView },
  { path: [`${BasePaths.odp}:odpId/`, BasePaths.odp], component: OriginalDataPointView },

  { path: BasePaths.admin, component: AdminView },
  { path: BasePaths.user, component: EditUserView },
  { path: BasePaths.country, component: CountryLandingView },
  { path: BasePaths.root, component: Landing },
]

export default routes
