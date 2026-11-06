import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import copyNationalClasses from 'test/integration/activityLog/nationalDataPoint/copyNationalClasses'
import create from 'test/integration/activityLog/nationalDataPoint/create'
import deleteNationalClass from 'test/integration/activityLog/nationalDataPoint/deleteNationalClass'
import remove from 'test/integration/activityLog/nationalDataPoint/remove'
import updateComments from 'test/integration/activityLog/nationalDataPoint/updateComments'
import updateDataSources from 'test/integration/activityLog/nationalDataPoint/updateDataSources'
import updateNationalClasses from 'test/integration/activityLog/nationalDataPoint/updateNationalClasses'
import updateOriginalData from 'test/integration/activityLog/nationalDataPoint/updateOriginalData'
import updateYear from 'test/integration/activityLog/nationalDataPoint/updateYear'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { nationalDataPointCountryIso } from 'test/integration/mock/nationalDataPoint'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('National data point', () => {
    beforeAll(async () => {
      const user = await UserController.getOne({ email: userMockTest.email })
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      })
      const country = await AreaController.getCountry({ assessment, countryIso: nationalDataPointCountryIso, cycle })

      testContext.activityLog = { assessment, country, cycle, user }
    })

    create()
    updateYear()
    updateDataSources()
    updateOriginalData()
    updateNationalClasses()
    copyNationalClasses()
    deleteNationalClass()
    updateComments()
    remove()
  })
}
