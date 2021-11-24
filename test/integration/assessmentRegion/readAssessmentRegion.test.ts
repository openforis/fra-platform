import { AssessmentService } from '@server/service/assessment'
import { AssessmentRegionService } from '@server/service/assessmentRegion'

export default () =>
  test('Expect assessment region exists', async () => {
    // We currently have data only in fra_assessment
    const assessment = await AssessmentService.read({
      assessment: {
        props: {
          name: 'fra',
        },
      },
    })

    const assessmentRegions = await AssessmentRegionService.readAll({ assessment })

    expect(Array.isArray(assessmentRegions)).toBe(true)
    expect(assessmentRegions[0]).toHaveProperty('regionCode')
  })
