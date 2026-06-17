import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user/user'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import { UserController } from 'server/controller/user'

import { assessmentCycleName, assessmentParams, originalDataPoint } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'

export default (): void => {
  describe('Original data point', () => {
    let assessment: Assessment
    let cycle: Cycle
    let country: Country
    let user: User
    let gotOriginalDataPoint: OriginalDataPoint

    beforeAll(async () => {
      ;({ assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
        metaCache: true,
      }))

      country = await AreaController.getCountry({ assessment, cycle, countryIso: originalDataPoint.countryIso })
      user = await UserController.getOne({ email: userMockTest.email })
    })

    test('Create new Original data point', async () => {
      const createdOriginalDataPoint = await NationalDataPointController.create({
        assessment,
        cycle,
        country,
        sectionName: 'extentOfForest',
        originalDataPoint,
        user,
        notifyClient: false,
      })

      gotOriginalDataPoint = await NationalDataPointController.getOne({
        assessment,
        cycle,
        year: String(createdOriginalDataPoint.year),
        countryIso: createdOriginalDataPoint.countryIso,
      })

      expect(createdOriginalDataPoint).toHaveProperty('id')
      expect(gotOriginalDataPoint).toHaveProperty('id')
      expect(createdOriginalDataPoint.countryIso).toBe(originalDataPoint.countryIso)
      expect(createdOriginalDataPoint.countryIso).toBe(gotOriginalDataPoint.countryIso)
    })

    // TODO: disabled: it will be enabled after inserting metadata (forestArea and forestCharacteristics tables)
    // it('Edit existing/not existing Original data point', async () => {
    //   const editedOriginalDataPoint = await CycleDataController.updateOriginalDataPoint({
    //     assessment,
    //     cycle: assessmentCycle,
    //     originalDataPoint: { ...gotOriginalDataPoint, year: 2018 },
    //     user,
    //   })
    //
    //   await expect(
    //     CycleDataController.updateOriginalDataPoint({
    //       assessment,
    //       cycle: assessmentCycle,
    //       originalDataPoint: { ...gotOriginalDataPoint, id: 5, year: 2017 },
    //       user,
    //     })
    //   ).rejects.toThrowError('No data returned from the query.')
    //
    //   expect(gotOriginalDataPoint).toHaveProperty('id')
    //   expect(gotOriginalDataPoint.year).toBe(2019)
    //   expect(editedOriginalDataPoint.year).toBe(2018)
    // })

    // TODO: disabled: it will be enabled after inserting metadata (forestArea and forestCharacteristics tables)
    // it('Remove existing/not existing Original data point', async () => {
    //   const removedOriginalDataPoint = await CycleDataController.removeOriginalDataPoint({
    //     assessment,
    //     cycle: assessmentCycle,
    //     originalDataPoint: gotOriginalDataPoint,
    //     user,
    //   })
    //
    //   await expect(
    //     CycleDataController.removeOriginalDataPoint({
    //       assessment,
    //       cycle: assessmentCycle,
    //       originalDataPoint: { ...gotOriginalDataPoint, id: 5 },
    //       user,
    //     })
    //   ).rejects.toThrowError('No data returned from the query.')
    //
    //   expect(removedOriginalDataPoint).toHaveProperty('id')
    // })

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
