import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import { initialiseCycle } from 'test/integration/activityLog/initialiseCycle'
import updateCalculatedNode from 'test/integration/activityLog/tableData/updateCalculatedNode'
import updateNode from 'test/integration/activityLog/tableData/updateNode'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { nationalDataPointCountryIso } from 'test/integration/mock/nationalDataPoint'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('Table data', () => {
    beforeAll(async () => {
      const user = await UserController.getOne({ email: userMockTest.email })
      const assessmentProps = { assessmentName: assessmentParams.props.name, cycleName: assessmentCycleName }
      const { assessment: assessmentBase, cycle } = await AssessmentController.getOneWithCycle(assessmentProps)
      await initialiseCycle({ assessment: assessmentBase, cycle, user })
      // refresh meta cache to include above created table
      const { assessment } = await AssessmentController.getOneWithCycle({
        ...assessmentProps,
        force: true,
        metaCache: true,
      })
      const country = await AreaController.getCountry({ assessment, countryIso: nationalDataPointCountryIso, cycle })

      testContext.activityLog = { assessment, country, cycle, user }
    })

    updateNode()
    updateCalculatedNode()
  })
}
