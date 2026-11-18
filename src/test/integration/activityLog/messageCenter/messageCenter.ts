import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import addMessage from 'test/integration/activityLog/messageCenter/addMessage'
import markMessageDeleted from 'test/integration/activityLog/messageCenter/markMessageDeleted'
import updateTopicStatus from 'test/integration/activityLog/messageCenter/updateTopicStatus'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { nationalDataPointCountryIso } from 'test/integration/mock/nationalDataPoint'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('Message center', () => {
    beforeAll(async () => {
      const user = await UserController.getOne({ email: userMockTest.email })
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      })
      const country = await AreaController.getCountry({ assessment, countryIso: nationalDataPointCountryIso, cycle })

      testContext.activityLog = { assessment, country, cycle, user }
    })

    addMessage()
    updateTopicStatus()
    markMessageDeleted()
  })
}
