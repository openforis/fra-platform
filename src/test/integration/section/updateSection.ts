import { AssessmentController } from '@server/controller/assessment'
import { SectionController } from '@server/controller/section'
import { UserController } from '@server/controller/user'

import { assessmentParams } from '@test/integration/mock/assessment'
import { sectionParams } from '@test/integration/mock/section'
import { userMockTest } from '@test/integration/mock/user'

export default () => {
  return test('Expect section to be updated', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const section = await SectionController.create({
      assessment,
      user,
      section: sectionParams,
    })

    const sectionUpdated = await SectionController.update({
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
