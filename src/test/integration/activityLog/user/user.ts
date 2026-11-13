import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import acceptInvitation from 'test/integration/activityLog/user/acceptInvitation'
import invite from 'test/integration/activityLog/user/invite'
import removeInvitation from 'test/integration/activityLog/user/removeInvitation'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { nationalDataPointCountryIso } from 'test/integration/mock/nationalDataPoint'
import { userMockTest, userMockUnknown } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('User', () => {
    beforeAll(async () => {
      const user = await UserController.getOne({ email: userMockTest.email })
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      })
      const country = await AreaController.getCountry({ assessment, countryIso: nationalDataPointCountryIso, cycle })

      testContext.activityLog = { assessment, country, cycle, user }
    })

    afterAll(async () => {
      // invite creates the user
      await UserController.remove({ user: testContext.activityLog.user, userToRemove: userMockUnknown })
    })

    invite()
    removeInvitation()
    invite()
    acceptInvitation()
  })
}
