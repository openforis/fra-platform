import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

// test to update table section
export default (): void =>
  test('Expect table section to be updated', async () => {
    const user = await UserController.getOne({ email: userMockTest.email })
    const assessment = await AssessmentController.getOne({ assessmentName: assessmentParams.props.name })

    const { tableSection } = testContext
    expect(tableSection?.uuid).toBeTruthy()

    const tableSectionUpdated = await MetadataController.updateTableSection({
      assessment,
      user,
      tableSection: {
        ...tableSection,
        props: {
          ...tableSection.props,
          descriptions: { 'description 1': {}, 'description 2': {} },
        },
      },
    })

    expect(tableSectionUpdated).toHaveProperty('id')
    expect(tableSectionUpdated.id).toBeTruthy()
    expect(tableSectionUpdated).toHaveProperty('uuid')
    expect(tableSectionUpdated.uuid).toBeTruthy()

    expect(tableSectionUpdated).toHaveProperty('props')
    expect(tableSectionUpdated).toHaveProperty('props.descriptions')
    expect(tableSectionUpdated.props.descriptions).toEqual({ 'description 1': {}, 'description 2': {} })
  })
