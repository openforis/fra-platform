import { AssessmentService } from '@server/service/assessment'

export default () =>
  test('Expect assessment region exists', async () => {
    // We currently have data only in fra_assessment
    const assessment = await AssessmentService.read({
      name: 'fra',
    })

    const assessmentRegions = await AssessmentService.getRegions({ assessment })

    expect(Array.isArray(assessmentRegions)).toBe(true)
    expect(assessmentRegions[0]).toHaveProperty('regionCode')
  })
