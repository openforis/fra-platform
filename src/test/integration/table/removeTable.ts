import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { tableParams } from 'test/integration/mock/table'
import { userMockTest } from 'test/integration/mock/user'

// test to remove table
export default () =>
  test('Expect table to be removed', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
    })

    const table = await MetadataController.createTable({
      assessment,
      user,
      table: tableParams,
    })

    await MetadataController.removeTable({
      assessment,
      user,
      table,
    })

    await expect(
      MetadataController.getTable({
        assessment,
        cycle,
        tableName: table.props.name,
      })
    ).rejects.toThrowError()
  })
