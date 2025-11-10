import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { tableParams } from 'test/integration/mock/table'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

// test create table
export default (): void =>
  test('Expect table to be created', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const { tableSection } = testContext
    expect(tableSection?.uuid).toBeTruthy()

    const table = await MetadataController.createTable({
      assessment,
      user,
      table: { ...tableParams, tableSectionUuid: tableSection.uuid },
    })

    expect(table).toHaveProperty('id')
    expect(table.id).toBeTruthy()
    expect(table).toHaveProperty('uuid')
    expect(table.uuid).toBeTruthy()

    expect(table).toHaveProperty('tableSectionUuid')
    expect(table).toHaveProperty('props.name')
    expect(table.props.name).toBe(tableParams.props.name)
    expect(table.tableSectionUuid).toBe(tableSection.uuid)
  })
