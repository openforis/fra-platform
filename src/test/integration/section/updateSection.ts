import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { sectionParams } from 'test/integration/mock/section'
import { userMockTest } from 'test/integration/mock/user'

export default () => {
  return test('Expect section to be updated', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
      cycleName: '2020',
    })

    const section = await MetadataController.createSection({
      assessment,
      user,
      section: sectionParams(cycle.uuid),
    })

    const sectionUpdated = await MetadataController.updateSection({
      assessment,
      user,
      section: {
        ...section,
        props: {
          ...section.props,
          index: 2222,
        },
      },
    })

    expect(sectionUpdated).toHaveProperty('id')
    expect(sectionUpdated.id).toBeTruthy()
    expect(sectionUpdated).toHaveProperty('uuid')
    expect(sectionUpdated.uuid).toBeTruthy()

    expect(sectionUpdated).toHaveProperty('props')
    expect(sectionUpdated).toHaveProperty('props.index')
    expect(sectionUpdated.props.index).toBe(2222)
  })
}
