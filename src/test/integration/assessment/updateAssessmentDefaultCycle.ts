import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'

export default (): void =>
  test('Update Assessment Default Cycle', async () => {
    const { cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessmentParams.props.name,
      cycleName: assessmentCycleName,
    })

    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const updatedAssessment = await AssessmentController.updateDefaultCycle({ user, assessment, cycle })
    expect(updatedAssessment.props.defaultCycle).toBe(cycle.uuid)
  })
