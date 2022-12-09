import { AssessmentController } from '@server/controller/assessment'
import { MetadataController } from '@server/controller/metadata'
import { UserController } from '@server/controller/user'

import { assessmentParams } from '@test/integration/mock/assessment'
import { sectionParams } from '@test/integration/mock/section'
import { userMockTest } from '@test/integration/mock/user'

export default () =>
  test('Expect section to be created', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const section = await MetadataController.createSection({
      assessment,
      user,
      section: sectionParams,
    })

    expect(section).toHaveProperty('id')
    expect(section.id).toBeTruthy()
    expect(section).toHaveProperty('uuid')
    expect(section.uuid).toBeTruthy()

    expect(section).toHaveProperty('props')
    expect(section).toHaveProperty('props.index')
    expect(section.props.index).toBe(sectionParams.props.index)
  })
