import assessmentCreate from '@test/integration/assessment/createAssessment'
import originalDataPoint from '@test/integration/assessment/originalDataPoint'
import assessmentRemove from '@test/integration/assessment/removeAssessment'
import messageCenter from '@test/integration/messageCenter/messageCenter'
import settingsDefaultAssessment from '@test/integration/settings/defaultAssessment'
import userCreate from '@test/integration/user/userCreate'
import userInvite from '@test/integration/user/userInvite'
import userRemove from '@test/integration/user/userRemove'
import userResetPassword from '@test/integration/user/userResetPassword'
import userActive from '@test/integration/user/userSetActive'
import userInactive from '@test/integration/user/userSetInactive'

import { DB } from '@server/db'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Metadata integration test', () => {
  // TODO: rename userCreate to userAdminCreate (and add mock user as admin)
  userCreate()

  // TODO: Remove userInactive / userActive
  userInactive()
  userActive()

  // assessment
  assessmentCreate()
  settingsDefaultAssessment()

  // user
  userInvite()
  userResetPassword()
  originalDataPoint()
  messageCenter()

  // remove from db
  assessmentRemove()
  userRemove()
})
