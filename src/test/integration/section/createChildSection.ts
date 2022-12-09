import { AssessmentController } from '@server/controller/assessment'
import { MetadataController } from '@server/controller/metadata'
import { UserController } from '@server/controller/user'

import { assessmentParams } from '@test/integration/mock/assessment'
import { subSectionParams } from '@test/integration/mock/section'
import { userMockTest } from '@test/integration/mock/user'

export default () =>
  test('Expect Child section to be created', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const section = await MetadataController.createSubSection({
      assessment,
      user,
      section: subSectionParams,
      parentSectionId: 1,
    })

    expect(section).toHaveProperty('id')
    expect(section.id).toBeTruthy()
    expect(section).toHaveProperty('uuid')
    expect(section.uuid).toBeTruthy()

    expect(section).toHaveProperty('props')
    expect(section).toHaveProperty('props.name')
    expect(section.props.name).toBe(subSectionParams.props.name)
  })
