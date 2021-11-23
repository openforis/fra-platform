import { AssessmentService } from '@server/service/assessment'
import { AssessmentRegionService } from '@server/service/assessment_region'
import { assessmentParams } from '@test/integration/assessment/assessmentParams'

export default () =>
  test('Expect assessment region exists', async () => {
    const assessment = await AssessmentService.read({
      assessment: assessmentParams,
    })

    const assessmentRegions = await AssessmentRegionService.readAll({ assessment })

    expect(Array.isArray(assessmentRegions)).toBe(true)
    expect(assessmentRegions[0]).toHaveProperty('regionCode')
  })
