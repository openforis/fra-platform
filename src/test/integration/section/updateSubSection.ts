import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { subSectionParams } from 'test/integration/mock/section'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  return test('Expect section to be updated', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
      cycleName: '2020',
    })

    const { section: parentSection } = testContext
    expect(parentSection?.uuid).toBeTruthy()

    const subSection = await MetadataController.createSubSection({
      assessment,
      user,
      section: subSectionParams(cycle.uuid),
      parentSectionUuid: parentSection.uuid,
    })

    const sectionUpdated = await MetadataController.updateSubSection({
      assessment,
      user,
      section: {
        ...subSection,
        props: {
          ...subSection.props,
          name: 'update_name',
        },
      },
    })

    expect(sectionUpdated).toHaveProperty('id')
    expect(sectionUpdated.id).toBeTruthy()
    expect(sectionUpdated).toHaveProperty('uuid')
    expect(sectionUpdated.uuid).toBeTruthy()

    expect(sectionUpdated).toHaveProperty('props')
    expect(sectionUpdated).toHaveProperty('props.name')
    expect(sectionUpdated.props.name).toBe('update_name')
  })
}
