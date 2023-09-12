import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { tableParams } from 'test/integration/mock/table'
import { userMockTest } from 'test/integration/mock/user'

// test create table
export default () =>
  test('Expect table to be created', async () => {
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

    expect(table).toHaveProperty('id')
    expect(table.id).toBeTruthy()
    expect(table).toHaveProperty('uuid')
    expect(table.uuid).toBeTruthy()

    expect(table).toHaveProperty('tableSectionId')
    expect(table).toHaveProperty('props.name')
    expect(table.props.name).toBe(tableParams.props.name)
  })
