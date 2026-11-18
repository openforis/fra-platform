import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import createSection from 'test/integration/activityLog/metadata/createSection'
import createSubSection from 'test/integration/activityLog/metadata/createSubSection'
import createTable from 'test/integration/activityLog/metadata/createTable'
import createTableSection from 'test/integration/activityLog/metadata/createTableSection'
import removeSection from 'test/integration/activityLog/metadata/removeSection'
import removeTable from 'test/integration/activityLog/metadata/removeTable'
import removeTableSection from 'test/integration/activityLog/metadata/removeTableSection'
import updateSection from 'test/integration/activityLog/metadata/updateSection'
import updateSubSection from 'test/integration/activityLog/metadata/updateSubSection'
import updateTable from 'test/integration/activityLog/metadata/updateTable'
import updateTableSection from 'test/integration/activityLog/metadata/updateTableSection'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('Metadata', () => {
    beforeAll(async () => {
      const user = await UserController.getOne({ email: userMockTest.email })
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      })

      // Metadata activity logs use no country
      testContext.activityLog = { assessment, country: undefined, cycle, user }
    })

    createSection()
    createSubSection()
    updateSection()
    updateSubSection()
    createTableSection()
    updateTableSection()
    createTable()
    updateTable()

    removeTable()
    removeTableSection()
    removeSection()
  })
}
