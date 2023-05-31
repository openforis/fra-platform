import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { tableSectionParams } from 'test/integration/mock/tableSection'
import { userMockTest } from 'test/integration/mock/user'

// test remove table section
export default () =>
  test('Expect table section to be removed', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
    })

    const tableSection = await MetadataController.createTableSection({
      assessment,
      user,
      tableSection: tableSectionParams,
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
