import { AssessmentService } from '@server/service/assessment'
import { AssessmentCountryService } from '@server/service/assessmentCountry'

export default () =>
  test('Expect assessment country exists', async () => {
    // We currently have data only in fra_assessment
    const assessment = await AssessmentService.read({
      name: 'fra',
    })

    const assessmentCountries = await AssessmentCountryService.readAll({ assessment })

    expect(Array.isArray(assessmentCountries)).toBe(true)
    expect(assessmentCountries[0]).toHaveProperty('countryIso')
  })
