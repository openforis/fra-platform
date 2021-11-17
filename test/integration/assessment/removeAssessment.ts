import { AssessmentService } from '@server/service/assessment'

export default () =>
  test('Expect assessment to be removed', async () => {
    const assessmentParams = {
      props: {
        name: 'fra',
        cycles: ['1'],
      },
    }

    const assessment = await AssessmentService.read({
      assessment: assessmentParams,
    })

    const removedAssessment = await AssessmentService.remove({
      assessment,
    })

    expect(removedAssessment).toHaveProperty('id')
    expect(removedAssessment.id).toBeTruthy()
    expect(removedAssessment.id).toBe(assessment.id)
    expect(removedAssessment.props.name).toBe(assessment.props.name)
  })
