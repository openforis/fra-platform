const assert = require('chai').assert
const estimationEngine = require('../../server/eof/estimationEngine')
const R = require('ramda')
const jsonDiff = require('jsondiffpatch')

const fraYears = [
  1990,
  2000,
  2010,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020]

const testOdpSet1 = [
  {
    forestArea: 40000,
    otherWoodedLand: 2000,
    otherLand: 80000,
    type: 'odp',
    year: 1991,
  },
  {
    forestArea: 80000,
    otherWoodedLand: 29000,
    otherLand: 80000,
    type: 'odp',
    year: 2018,
  }]

const expectedEstimations1 = [
  {
    forestArea: 38519,
    otherWoodedLand: 1000,
    otherLand: 80000,
    year: 1990,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 53333,
    otherWoodedLand: 11000,
    otherLand: 80000,
    year: 2000,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 68148,
    otherWoodedLand: 21000,
    otherLand: 80000,
    year: 2010,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 75556,
    otherWoodedLand: 26000,
    otherLand: 80000,
    year: 2015,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 77037,
    otherWoodedLand: 27000,
    otherLand: 80000,
    year: 2016,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 78519,
    otherWoodedLand: 28000,
    otherLand: 80000,
    year: 2017,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 80000,
    otherWoodedLand: 29000,
    otherLand: 80000,
    year: 2018,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 81481,
    otherWoodedLand: 30000,
    otherLand: 80000,
    year: 2019,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  },
  {
    forestArea: 82963,
    otherWoodedLand: 31000,
    otherLand: 80000,
    year: 2020,
    forestAreaEstimated:true,
    otherWoodedLandEstimated:true,
    otherLandEstimated:true
  }]

describe('estimationEngine', () => {
  it('Interpolates and extrapolates as expected', () => {
    const estimated = estimationEngine.estimateFraValues(
      fraYears,
      testOdpSet1,
      estimationEngine.eofFields
    )
    assert(
      R.equals(expectedEstimations1, estimated),
      `Estimated values were not as expected ${JSON.stringify(jsonDiff.diff(expectedEstimations1, estimated))}`)
  })
})
