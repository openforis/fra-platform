import { AssessmentController, UserController } from '@server/controller'
import { assessmentParams, assessmentCycleName, originalDataPoint } from '@test/integration/mock/assessment'
import { userMockTest } from '@test/integration/mock/user'

export default (): void =>
  test('Expect original data point to be created', async () => {
    const user = await UserController.read({
      user: userMockTest,
    })

    const assessment = await AssessmentController.read({ name: assessmentParams.props.name })
    const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === assessmentCycleName)

    const createdOriginalDataPoint = await AssessmentController.createOriginalDataPoint({
      user,
      assessment,
      assessmentCycle,
      originalDataPoint,
    })

    const gotOriginalDataPoint = await AssessmentController.getOriginalDataPoint({
      name: assessment.props.name,
      cycleName: assessmentCycleName,
      odpId: createdOriginalDataPoint.id,
    })

    expect(createdOriginalDataPoint).toHaveProperty('id')
    expect(gotOriginalDataPoint).toHaveProperty('id')
    expect(createdOriginalDataPoint.countryIso).toBe(originalDataPoint.countryIso)
    expect(createdOriginalDataPoint.countryIso).toBe(gotOriginalDataPoint.countryIso)
  })
