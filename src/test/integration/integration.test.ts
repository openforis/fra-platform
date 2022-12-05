import { DB } from '@server/db'

import assessmentCreate from '@test/integration/assessment/createAssessment'
import originalDataPoint from '@test/integration/assessment/originalDataPoint'
import assessmentRemove from '@test/integration/assessment/removeAssessment'
import updateAssessmentDefaultCycle from '@test/integration/assessment/updateAssessmentDefaultCycle'
import messageCenter from '@test/integration/messageCenter/messageCenter'
import sectionCreate from '@test/integration/section/createSection'
import sectionUpdate from '@test/integration/section/updateSection'
import settingsDefaultAssessment from '@test/integration/settings/defaultAssessment'
import userInvite from '@test/integration/user/userInvite'
import userRemove from '@test/integration/user/userRemove'
import userResetPassword from '@test/integration/user/userResetPassword'

import userCreate from './user/userCreate'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Metadata integration test', () => {
  // TODO: rename userCreate to userAdminCreate (and add mock user as admin)
  userCreate()

  // assessment
  assessmentCreate()
  settingsDefaultAssessment()
  updateAssessmentDefaultCycle()

  // section

  sectionCreate()
  sectionUpdate()

  // user
  userInvite()
  userResetPassword()
  originalDataPoint()
  messageCenter()

  // remove from db
  assessmentRemove()
  userRemove()
})
