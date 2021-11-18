import { AssessmentService } from '@server/service/assessment'
import { SettingsService } from '@server/service'

export default () =>
  test('Expect default assessment to be updated', async () => {
    const assessmentParams = {
      props: {
        name: 'fra',
        cycles: ['1'],
      },
    }

    const assessment = await AssessmentService.read({
      assessment: assessmentParams,
    })

    const settings = await SettingsService.read()

    expect(assessment).toHaveProperty('id')
    expect(settings).toHaveProperty('defaultAssessmentId')
    expect(settings.defaultAssessmentId).toBe(assessment.id)
  })
