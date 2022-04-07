import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'
import { assessmentParams, assessmentCycleName, originalDataPoint } from '@test/integration/mock/assessment'
import { userMockTest } from '@test/integration/mock/user'
import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'

export default (): void =>
  describe('Original data point', () => {
    let assessment: Assessment
    let assessmentCycle: Cycle
    let user: User
    let gotOriginalDataPoint: OriginalDataPoint

    beforeAll(async () => {
      ;({ assessment, cycle: assessmentCycle } = await AssessmentController.getOneWithCycle({
        name: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      }))

      user = await UserController.getOne({ email: userMockTest.email })
    })

    it('Create new Original data point', async () => {
      const createdOriginalDataPoint = await AssessmentController.createOriginalDataPoint({
        assessment,
        assessmentCycle,
        originalDataPoint,
        user,
      })

      gotOriginalDataPoint = await AssessmentController.getOriginalDataPoint({
        name: assessment.props.name,
        cycleName: assessmentCycleName,
        year: String(createdOriginalDataPoint.year),
        countryIso: createdOriginalDataPoint.countryIso,
      })

      expect(createdOriginalDataPoint).toHaveProperty('id')
      expect(gotOriginalDataPoint).toHaveProperty('id')
      expect(createdOriginalDataPoint.countryIso).toBe(originalDataPoint.countryIso)
      expect(createdOriginalDataPoint.countryIso).toBe(gotOriginalDataPoint.countryIso)
    })

    it('Edit existing/not existing Original data point', async () => {
      const editedOriginalDataPoint = await AssessmentController.updateOriginalDataPoint({
        assessment,
        assessmentCycle,
        originalDataPoint: { ...gotOriginalDataPoint, year: 2018 },
        user,
      })

      await expect(
        AssessmentController.updateOriginalDataPoint({
          assessment,
          assessmentCycle,
          originalDataPoint: { ...gotOriginalDataPoint, id: 5, year: 2017 },
          user,
        })
      ).rejects.toThrowError('No data returned from the query.')

      expect(gotOriginalDataPoint).toHaveProperty('id')
      expect(gotOriginalDataPoint.year).toBe(2019)
      expect(editedOriginalDataPoint.year).toBe(2018)
    })

    it('Remove existing/not existing Original data point', async () => {
      const removedOriginalDataPoint = await AssessmentController.removeOriginalDataPoint({
        assessment,
        assessmentCycle,
        originalDataPoint: gotOriginalDataPoint,
        user,
      })

      await expect(
        AssessmentController.removeOriginalDataPoint({
          assessment,
          assessmentCycle,
          originalDataPoint: { ...gotOriginalDataPoint, id: 5 },
          user,
        })
      ).rejects.toThrowError('No data returned from the query.')

      expect(removedOriginalDataPoint).toHaveProperty('id')
    })

    it('Get not existing Original data point', async () => {
      await expect(
        AssessmentController.getOriginalDataPoint({
          name: assessment.props.name,
          cycleName: assessmentCycleName,
          year: '2299',
          countryIso: 'FIN',
        })
      ).rejects.toThrowError('No data returned from the query.')
    })
  })
