import { UserController } from '@server/controller/user'
import { AssessmentController } from '@server/controller/assessment'
import { assessmentParams } from '@test/integration/assessment/assessmentParams'

export default () =>
  test('Expect assessment to be created', async () => {
    const userParams = {
      email: 'test@fra-platform.com',
    }

    const user = await UserController.read({
      user: userParams,
    })

    const assessment = await AssessmentController.create({
      assessment: assessmentParams,
      user,
    })

    expect(assessment).toHaveProperty('id')
    expect(assessment.id).toBeTruthy()
    expect(assessment).toHaveProperty('uuid')
    expect(assessment.uuid).toBeTruthy()

    expect(assessment).toHaveProperty('props')

    expect(assessment).toHaveProperty('props.name')
    expect(assessment.props.name).toBe(assessmentParams.props.name)
  })
