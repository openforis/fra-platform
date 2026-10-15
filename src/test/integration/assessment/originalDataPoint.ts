import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'

export default (): void => {
  describe('Original data point', () => {
    let assessment: Assessment
    let cycle: Cycle

    beforeAll(async () => {
      ;({ assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      }))
    })

    test('Get not existing Original data point', async () => {
      await expect(
        NationalDataPointController.getOne({
          assessment,
          cycle,
          year: '2299',
          countryIso: 'FIN',
        })
      ).resolves.toBeNull()
    })
  })
}
