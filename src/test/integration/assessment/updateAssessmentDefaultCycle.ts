import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'

import { assessmentParams } from '@test/integration/mock/assessment'
import { userMockTest } from '@test/integration/mock/user'

export default (): void =>
  test('Update Assessment Default Cycle', async () => {
    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const oldCycle = assessment.props.defaultCycle
    assessment.props.defaultCycle = 'test'

    const updatedAssessment = await AssessmentController.updateDefaultCycle({ user, assessment })
    expect(updatedAssessment.props.defaultCycle).toBe('test')

    assessment.props.defaultCycle = oldCycle
    const oldCycleAssessment = await AssessmentController.updateDefaultCycle({ user, assessment })
    expect(oldCycleAssessment.props.defaultCycle).toBe(oldCycle)
  })
