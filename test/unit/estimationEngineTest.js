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
    odpId: '46',
    forestArea: 40000,
    otherWoodenLand: 80000,
    otherLand: 80000,
    name: '1991',
    type: 'odp',
    year: 1991,
    draft: false
  },
  {
    odpId: '47',
    forestArea: 80000,
    otherWoodenLand: 40000,
    otherLand: 80000,
    name: '2018',
    type: 'odp',
    year: 2018,
    draft: false
  }]

const expectedEstimations1 = [
  {
    forestArea: 38518.519,
    otherWoodenLand: 81481.481,
    otherLand: 80000,
    year: 1990,
    store: true
  },
  {
    forestArea: 53333.333,
    otherWoodenLand: 66666.667,
    otherLand: 80000,
    year: 2000,
    store: true
  },
  {
    forestArea: 68148.148,
    otherWoodenLand: 51851.852,
    otherLand: 80000,
    year: 2010,
    store: true
  },
  {
    forestArea: 75555.556,
    otherWoodenLand: 44444.444,
    otherLand: 80000,
    year: 2015,
    store: true
  },
  {
    forestArea: 77037.037,
    otherWoodenLand: 42962.963,
    otherLand: 80000,
    year: 2016,
    store: true
  },
  {
    forestArea: 78518.519,
    otherWoodenLand: 41481.482,
    otherLand: 80000,
    year: 2017,
    store: true
  },
  {
    odpId: '47',
    forestArea: 80000,
    otherWoodenLand: 40000,
    otherLand: 80000,
    name: '2018',
    type: 'odp',
    year: 2018,
    draft: false,
    store: true
  },
  {
    forestArea: 81481.481,
    otherWoodenLand: 38518.518,
    otherLand: 80000,
    year: 2019,
    store: true
  },
  {
    forestArea: 82962.962,
    otherWoodenLand: 37037.036,
    otherLand: 80000,
    year: 2020,
    store: true
  }]

describe('estimationEngine', () => {
  it('Interpolates and extrapolates as expected', () => {
    const estimated = estimationEngine.estimateFraValues('ITA',
      fraYears,
      testOdpSet1)
    assert(R.equals(expectedEstimations1, estimated), 'Estimated values were not as expected')
  })
})
