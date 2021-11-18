import { AssessmentService } from '@server/service/assessment'

export default () =>
  test('Expect assessment to be removed', async () => {
    const assessmentParams = {
      props: {
        name: 'fra',
        cycles: ['1'],
      },
    }

    const assessment = await AssessmentService.read({
      assessment: assessmentParams,
    })

    await AssessmentService.remove({
      assessment,
    })

    try {
      await AssessmentService.read({
        assessment: assessmentParams,
      })
    } catch (e) {
      expect(e.message).toBe('No data returned from the query.')
    }
  })
