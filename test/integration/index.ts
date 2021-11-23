import { DB } from '@server/db'

import userCreate from './user/userCreate.test'
import userInactive from './user/userSetInactive.test'
import userActive from './user/userSetActive.test'
import assessmentCreate from './assessment/createAssessment'
import assessmentCountryRead from './assessment_country/readAssessmentCountry.test'
import assessmentRegionRead from './assessment_region/readAssessmentRegion.test'
import regionGroupRead from './region_group/readRegionGroup.test'
import settingsDefaultAssessment from './settings/defaultAssessment'
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
  assessmentCountryRead()
  assessmentRegionRead()
  regionGroupRead()
  settingsDefaultAssessment()
  assessmentRemove()
  userRemove()
})
