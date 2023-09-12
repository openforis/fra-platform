import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { sectionParams } from 'test/integration/mock/section'
import { userMockTest } from 'test/integration/mock/user'

export default () => {
  return test('Expect section to be removed', async () => {
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

    await MetadataController.removeSection({
      assessment,
      user,
      section,
    })

    await expect(
      MetadataController.getSection({
        assessment,
        cycle,
        id: section.id,
      })
    ).rejects.toThrowError()
  })
}
