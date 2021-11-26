import { AssessmentController } from '@server/controller/assessment'

export default () =>
  test('Expect assessment country exists', async () => {
    // We currently have data only in fra_assessment
    const assessment = await AssessmentController.read({
      name: 'fra',
    })

    const assessmentCountries = await AssessmentController.getCountries({ name: assessment.props.name })

    expect(Array.isArray(assessmentCountries)).toBe(true)
    expect(assessmentCountries[0]).toHaveProperty('countryIso')
  })
