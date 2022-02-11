import { AssessmentController, UserController } from '@server/controller'
import { Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'
import { assessmentParams, assessmentCycleName, originalDataPoint } from '@test/integration/mock/assessment'
import { userMockTest } from '@test/integration/mock/user'

export default (): void =>
  describe('Original data point', () => {
    let assessment: Assessment
    let assessmentCycle: Cycle
    let user: User

    beforeAll(async () => {
      assessment = await AssessmentController.read({ name: assessmentParams.props.name })
      assessmentCycle = assessment.cycles.find((cycle) => cycle.name === assessmentCycleName)
      user = await UserController.read({ user: { email: userMockTest.email } })
    })

    it('Expect original data point to be created', async () => {
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
  })
