import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { tableParams } from 'test/integration/mock/table'
import { userMockTest } from 'test/integration/mock/user'

// test to update table
export default () =>
  test('Expect table to be updated', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const table = await MetadataController.createTable({
      assessment,
      user,
      table: tableParams,
    })

    const tableUpdated = await MetadataController.updateTable({
      assessment,
      user,
      table,
      tableProps: {
        name: 'updated name',
      },
    })

    expect(tableUpdated).toHaveProperty('id')
    expect(tableUpdated.id).toBeTruthy()
    expect(tableUpdated).toHaveProperty('uuid')
    expect(tableUpdated.uuid).toBeTruthy()

    expect(tableUpdated).toHaveProperty('props')
    expect(tableUpdated).toHaveProperty('props.name')
    expect(tableUpdated.props.name).toEqual('updated name')
  })
