import { UserService } from '@server/service/user'
import { AssessmentService } from '@server/service/assessment'

export default () =>
  test('Expect assessment to be created', async () => {
    const userParams = {
      email: 'test@fra-platform.com',
    }

    const assessmentParams = {
      props: {
        name: 'fra',
        cycles: ['1'],
      },
    }

    const user = await UserService.read({
      user: userParams,
    })

    const assessment = await AssessmentService.create({
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

    expect(assessment).toHaveProperty('props.cycles')
    expect(assessment.props.cycles[0]).toBe('1')
  })
