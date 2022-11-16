import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'

import { assessmentCycleName, assessmentParams } from '@test/integration/mock/assessment'
import { userMockTest } from '@test/integration/mock/user'

export default (): void =>
  test('Update Assessment Default Cycle', async () => {
    const { cycle, assessment } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
      cycleName: assessmentCycleName,
    })

    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    assessment.props.defaultCycle = cycle.uuid

    const updatedAssessment = await AssessmentController.updateDefaultCycle({ user, assessment })
    expect(updatedAssessment.props.defaultCycle).toBe(cycle.uuid)
  })
