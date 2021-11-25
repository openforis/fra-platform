import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller'
import { assessmentParams } from '@test/integration/assessment/assessmentParams'

export default () =>
  test('Expect default assessment to be updated', async () => {
    const assessment = await AssessmentController.read({
      name: assessmentParams.props.name,
    })

    const settings = await SettingsController.update({
      settings: {
        defaultAssessmentId: assessment.id,
      },
    })

    expect(assessment).toHaveProperty('id')
    expect(settings).toHaveProperty('defaultAssessmentId')
    expect(settings.defaultAssessmentId).toBe(assessment.id)
  })
