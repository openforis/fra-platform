import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { tableSectionParams } from 'test/integration/mock/tableSection'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

// test create table section
export default (): void =>
  test('Expect table section to be created', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const { section: parentSection } = testContext
    expect(parentSection?.uuid).toBeTruthy()

    const tableSection = await MetadataController.createTableSection({
      assessment,
      user,
      tableSection: { ...tableSectionParams, sectionUuid: parentSection.uuid },
    })

    expect(tableSection).toHaveProperty('id')
    expect(tableSection.id).toBeTruthy()
    expect(tableSection).toHaveProperty('uuid')
    expect(tableSection.uuid).toBeTruthy()

    expect(tableSection).toHaveProperty('sectionUuid')
    expect(tableSection).toHaveProperty('props.descriptions')
    expect(tableSection.sectionUuid).toBe(parentSection.uuid)

    testContext.tableSection = tableSection
  })
