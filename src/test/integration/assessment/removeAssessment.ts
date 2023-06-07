import { AssessmentController } from 'server/controller/assessment'

import { assessmentParams } from 'test/integration/mock/assessment'

export default () =>
  test('Expect assessment to be removed', async () => {
    const assessment = await AssessmentController.getOne({
      assessmentName: assessmentParams.props.name,
    })

    await AssessmentController.remove({
      assessment,
    })

    try {
      await AssessmentController.getOne({
        assessmentName: assessmentParams.props.name,
      })
    } catch (e) {
      expect(e.message).toBe('No data returned from the query.')
    }
  })
