import { AssessmentService } from '@server/service/assessment'
import { assessmentParams } from '@test/integration/assessment/assessmentParams'

export default () =>
  test('Expect assessment to be removed', async () => {
    const assessment = await AssessmentService.read({
      name: assessmentParams.props.name,
    })

    await AssessmentService.remove({
      assessment,
    })

    try {
      await AssessmentService.read({
        name: assessmentParams.props.name,
      })
    } catch (e) {
      expect(e.message).toBe('No data returned from the query.')
    }
  })
