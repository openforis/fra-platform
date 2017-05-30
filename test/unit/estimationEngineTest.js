const assert = require('chai').assert
const estimationEngine = require('../../server/eof/estimation-engine')
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
    otherWoodenLand: 80000,
    otherLand: 80000,
    type: 'odp',
    year: 1991,
  },
  {
    forestArea: 80000,
    otherWoodenLand: 40000,
    otherLand: 80000,
    type: 'odp',
    year: 2018,
  }]

const expectedEstimations1 = [
  {
    forestArea: 38518.519,
    otherWoodenLand: 81481.481,
    otherLand: 80000,
    year: 1990,
  },
  {
    forestArea: 53333.333,
    otherWoodenLand: 66666.667,
    otherLand: 80000,
    year: 2000,
  },
  {
    forestArea: 68148.148,
    otherWoodenLand: 51851.852,
    otherLand: 80000,
    year: 2010,
  },
  {
    forestArea: 75555.556,
    otherWoodenLand: 44444.444,
    otherLand: 80000,
    year: 2015,
  },
  {
    forestArea: 77037.037,
    otherWoodenLand: 42962.963,
    otherLand: 80000,
    year: 2016,
  },
  {
    forestArea: 78518.519,
    otherWoodenLand: 41481.482,
    otherLand: 80000,
    year: 2017,
  },
  {
    forestArea: 80000,
    otherWoodenLand: 40000,
    otherLand: 80000,
    year: 2018,
  },
  {
    forestArea: 81481.481,
    otherWoodenLand: 38518.518,
    otherLand: 80000,
    year: 2019,
  },
  {
    forestArea: 82962.962,
    otherWoodenLand: 37037.036,
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
