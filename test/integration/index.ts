import { DB } from '@server/db'

import userCreate from '@test/integration/user/userCreate.test'
import userInactive from '@test/integration/user/userSetInactive.test'
import userActive from '@test/integration/user/userSetActive.test'
import assessmentCreate from '@test/integration/assessment/createAssessment'
import settingsDefaultAssessment from '@test/integration/settings/defaultAssessment'
import assessmentRemove from '@test/integration/assessment/removeAssessment'
import userRemove from '@test/integration/user/userRemove.test'
import userInvite from '@test/integration/user/userInvite'

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

  // remove from db
  assessmentRemove()
  userRemove()
})
