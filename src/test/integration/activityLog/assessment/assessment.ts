import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import create from 'test/integration/activityLog/assessment/create'
import createCycle from 'test/integration/activityLog/assessment/createCycle'
import removeCycle from 'test/integration/activityLog/assessment/removeCycle'
import { assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('Assessment', () => {
    beforeAll(async () => {
      const user = await UserController.getOne({ email: userMockTest.email })
      const assessment = await AssessmentController.getOne({ assessmentName: assessmentParams.props.name })

      // Assessment activity logs use no country, and only cycle create has a cycle
      testContext.activityLog = { assessment, country: undefined, cycle: undefined, user }
    })

    create()
    createCycle()
    removeCycle()
  })
}
