import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { subSectionParams } from 'test/integration/mock/section'
import { userMockTest } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void =>
  test('Expect Child section to be created', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
      cycleName: '2020',
    })

    const { section: parentSection } = testContext
    expect(parentSection?.uuid).toBeTruthy()

    const section = await MetadataController.createSubSection({
      assessment,
      user,
      section: subSectionParams(cycle.uuid),
      parentSectionUuid: parentSection.uuid,
    })

    expect(section).toHaveProperty('id')
    expect(section.id).toBeTruthy()
    expect(section).toHaveProperty('uuid')
    expect(section.uuid).toBeTruthy()

    expect(section).toHaveProperty('props')
    expect(section).toHaveProperty('props.name')
    expect(section.props.name).toBe(subSectionParams(cycle.uuid).props.name)
  })
