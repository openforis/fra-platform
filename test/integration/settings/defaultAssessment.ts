import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller'
import { assessmentParams } from '@test/integration/mock/assessment'

export default (): void =>
  test('Default assessment', async () => {
    const assessment = await AssessmentController.getOne({
      name: assessmentParams.props.name,
    })

    const settingsOrig = await SettingsController.read()

    const settings = await SettingsController.update({
      settings: {
        defaultAssessmentId: assessment.id,
      },
    })

    expect(assessment).toHaveProperty('id')
    expect(settings).toHaveProperty('defaultAssessmentId')
    expect(settings.defaultAssessmentId).toBe(assessment.id)

    await SettingsController.update({ settings: settingsOrig })
  })
