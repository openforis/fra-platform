import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'

export default () =>
  test('Expect assessment to be created', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const assessment = await AssessmentController.create({
      assessment: assessmentParams,
      user,
    })

    const assessmentCycle = await AssessmentController.createCycle({
      assessment,
      name: assessmentCycleName,
      user,
    })

    expect(assessment).toHaveProperty('id')
    expect(assessment.id).toBeTruthy()
    expect(assessment).toHaveProperty('uuid')
    expect(assessment.uuid).toBeTruthy()

    expect(assessment).toHaveProperty('props')

    expect(assessment).toHaveProperty('props.name')
    expect(assessment.props.name).toBe(assessmentParams.props.name)

    expect(assessmentCycle).toHaveProperty('id')
  })
