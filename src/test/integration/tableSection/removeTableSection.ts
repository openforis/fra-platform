import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { tableSectionParams } from 'test/integration/mock/tableSection'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

// test remove table section
export default (): void =>
  test('Expect table section to be removed', async () => {
    const user = await UserController.getOne({ email: userMockTest.email })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
      cycleName: assessmentCycleName,
    })

    const { section: parentSection } = testContext
    expect(parentSection?.uuid).toBeTruthy()

    const tableSection = await MetadataController.createTableSection({
      assessment,
      user,
      tableSection: { ...tableSectionParams, sectionUuid: parentSection.uuid },
    })

    await MetadataController.removeTableSection({
      assessment,
      user,
      tableSection,
    })

    await expect(
      MetadataController.getTableSection({
        assessment,
        cycle,
        id: tableSection.id,
      })
    ).rejects.toThrowError()
  })
