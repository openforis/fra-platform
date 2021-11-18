import { AssessmentService } from '@server/service/assessment'
import { SettingsService } from '@server/service'
import { assessmentParams } from '@test/integration/assessment/assessmentParams'

export default () =>
  test('Expect default assessment to be updated', async () => {
    const assessment = await AssessmentService.read({
      assessment: assessmentParams,
    })

    const settings = await SettingsService.update({
      settings: {
        defaultAssessmentId: assessment.id,
      },
    })

    expect(assessment).toHaveProperty('id')
    expect(settings).toHaveProperty('defaultAssessmentId')
    expect(settings.defaultAssessmentId).toBe(assessment.id)
  })
