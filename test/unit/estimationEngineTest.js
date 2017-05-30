const assert = require('chai').assert
const estimationEngine = require('../../server/eof/estimationEngine')
const R = require('ramda')

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
    forestArea: 38518.519,
    otherWoodedLand: 1000,
    otherLand: 80000,
    year: 1990,
  },
  {
    forestArea: 53333.333,
    otherWoodedLand: 11000,
    otherLand: 80000,
    year: 2000,
  },
  {
    forestArea: 68148.148,
    otherWoodedLand: 21000,
    otherLand: 80000,
    year: 2010,
  },
  {
    forestArea: 75555.556,
    otherWoodedLand: 26000,
    otherLand: 80000,
    year: 2015,
  },
  {
    forestArea: 77037.037,
    otherWoodedLand: 27000,
    otherLand: 80000,
    year: 2016,
  },
  {
    forestArea: 78518.519,
    otherWoodedLand: 28000,
    otherLand: 80000,
    year: 2017,
  },
  {
    forestArea: 80000,
    otherWoodedLand: 29000,
    otherLand: 80000,
    year: 2018,
  },
  {
    forestArea: 81481.481,
    otherWoodedLand: 30000,
    otherLand: 80000,
    year: 2019,
  },
  {
    forestArea: 82962.962,
    otherWoodedLand: 31000,
    otherLand: 80000,
    year: 2020,
  }]

describe('estimationEngine', () => {
  it('Interpolates and extrapolates as expected', () => {
    const estimated = estimationEngine.estimateFraValues(
      fraYears,
      testOdpSet1)
    assert(R.equals(expectedEstimations1, estimated), 'Estimated values were not as expected')
  })
})
