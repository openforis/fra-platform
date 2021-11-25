import { AssessmentController } from '@server/controller/assessment'

export default () =>
  test('Expect assessment region exists', async () => {
    // We currently have data only in fra_assessment
    const assessment = await AssessmentController.read({
      name: 'fra',
    })

    const assessmentRegions = await AssessmentController.getRegions({ assessment })

    expect(Array.isArray(assessmentRegions)).toBe(true)
    expect(assessmentRegions[0]).toHaveProperty('regionCode')
  })
