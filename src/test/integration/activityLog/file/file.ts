import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { FileRepository } from 'server/db/repository/public/file'

import createFiles from 'test/integration/activityLog/file/createFiles'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { nationalDataPointCountryIso } from 'test/integration/mock/nationalDataPoint'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('File', () => {
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
      await FileRepository.remove({ uuid: testContext.activityLogFile.uuid })
    })

    createFiles()
  })
}
