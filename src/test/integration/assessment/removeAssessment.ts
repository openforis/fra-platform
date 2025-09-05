import { AssessmentController } from 'server/controller/assessment'

import { assessmentParams } from 'test/integration/mock/assessment'

export default (): void =>
  test('Expect assessment to be removed', async () => {
    const { name: assessmentName } = assessmentParams.props

    const assessment = await AssessmentController.getOne({ assessmentName })
    await AssessmentController.remove({ assessment })

    try {
      await AssessmentController.getOne({ assessmentName })
    } catch (e) {
      expect(e.message).toBe('No data returned from the query.')
    }
  })
