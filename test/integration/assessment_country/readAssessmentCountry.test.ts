import { AssessmentService } from '@server/service/assessment'
import { AssessmentCountryService } from '@server/service/assessment_country'
import { assessmentParams } from '@test/integration/assessment/assessmentParams'

export default () =>
  test('Expect assessment country exists', async () => {
    const assessment = await AssessmentService.read({
      assessment: assessmentParams,
    })

    const assessmentCountries = await AssessmentCountryService.readAll({ assessment })

    expect(Array.isArray(assessmentCountries)).toBe(true)
    expect(assessmentCountries[0]).toHaveProperty('countryIso')
  })
