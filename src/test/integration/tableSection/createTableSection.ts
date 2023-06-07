import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { tableSectionParams } from 'test/integration/mock/tableSection'
import { userMockTest } from 'test/integration/mock/user'

// test create table section
export default () =>
  test('Expect table section to be created', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const tableSection = await MetadataController.createTableSection({
      assessment,
      user,
      tableSection: tableSectionParams,
    })

    expect(tableSection).toHaveProperty('id')
    expect(tableSection.id).toBeTruthy()
    expect(tableSection).toHaveProperty('uuid')
    expect(tableSection.uuid).toBeTruthy()

    expect(tableSection).toHaveProperty('sectionId')
    expect(tableSection).toHaveProperty('props.descriptions')
    expect(+tableSection.sectionId).toBe(tableSectionParams.sectionId)
  })
