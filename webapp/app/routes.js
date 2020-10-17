import * as BasePaths from '@webapp/main/basePaths'

import AdminView from '@webapp/app/admin/adminView'
import Assessment from '@webapp/pages/Assessment'

import AssessmentSectionView from '@webapp/app/assessment/components/section/assessmentSectionView'
import EditUserView from './user/userManagement/editUserView'
import OriginalDataPointView from './assessment/fra/sections/originalDataPoint/originalDataPointView'
import Landing from './landing'

const routes = [
  { path: BasePaths.assessmentSection, component: AssessmentSectionView },
  { path: [`${BasePaths.odp}:odpId/`, BasePaths.odp], component: OriginalDataPointView },
  { path: BasePaths.assessment, component: Assessment },

  { path: BasePaths.admin, component: AdminView },
  { path: BasePaths.user, component: EditUserView },
  { path: BasePaths.root, component: Landing },
]

export default routes
