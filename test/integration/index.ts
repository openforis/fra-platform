import { DB } from '@server/db'

import userCreate from './user/userCreate.test'
import userInactive from './user/userSetInactive.test'
import userActive from './user/userSetActive.test'
import assessmentCreate from './assessment/createAssessment'
import assessmentRemove from './assessment/removeAssessment'
import userRemove from './user/userRemove.test'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Metadata integration test', () => {
  userCreate()
  userInactive()
  userActive()
  assessmentCreate()
  assessmentRemove()
  userRemove()
})
