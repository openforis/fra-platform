import { DB } from '@server/db'

import userCreate from '@test/integration/user/userCreate'
import userInactive from '@test/integration/user/userSetInactive'
import userActive from '@test/integration/user/userSetActive'
import assessmentCreate from '@test/integration/assessment/createAssessment'
import settingsDefaultAssessment from '@test/integration/settings/defaultAssessment'
import assessmentRemove from '@test/integration/assessment/removeAssessment'
import userRemove from '@test/integration/user/userRemove'
import userInvite from '@test/integration/user/userInvite'
import userResetPassword from '@test/integration/user/userResetPassword'
import originalDataPointCreate from '@test/integration/assessment/originalDataPointCreate'

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

  originalDataPointCreate()

  // remove from db
  assessmentRemove()
  userRemove()
})
