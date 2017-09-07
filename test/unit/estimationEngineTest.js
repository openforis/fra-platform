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
    otherLandPalms: 30000,
    otherLandTreeOrchards: 40000,
    otherLandAgroforestry: 20000,
    otherLandTreesUrbanSettings: 2000,
    type: 'odp',
    year: 1991,
  },
  {
    forestArea: 80000,
    otherWoodedLand: 29000,
    otherLand: 80000,
    otherLandPalms: 35000,
    otherLandTreeOrchards: 45000,
    otherLandAgroforestry: 22000,
    otherLandTreesUrbanSettings: 1800,
    type: 'odp',
    year: 2018,
  }]

const expectedEstimations1 = [
  {
    forestArea: 38519,
    otherWoodedLand: 1000,
    otherLand: 80000,
    otherLandPalms: 29815,
    otherLandTreeOrchards: 39815,
    otherLandAgroforestry: 19926,
    otherLandTreesUrbanSettings: 2007,
    year: 1990,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 53333,
    otherWoodedLand: 11000,
    otherLand: 80000,
    otherLandPalms: 31667,
    otherLandTreeOrchards: 41667,
    otherLandAgroforestry: 20667,
    otherLandTreesUrbanSettings: 1933,
    year: 2000,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 68148,
    otherWoodedLand: 21000,
    otherLand: 80000,
    otherLandPalms: 33519,
    otherLandTreeOrchards: 43519,
    otherLandAgroforestry: 21407,
    otherLandTreesUrbanSettings: 1859,
    year: 2010,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 75556,
    otherWoodedLand: 26000,
    otherLand: 80000,
    otherLandPalms: 34444,
    otherLandTreeOrchards: 44444,
    otherLandAgroforestry: 21778,
    otherLandTreesUrbanSettings: 1822,
    year: 2015,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 77037,
    otherWoodedLand: 27000,
    otherLand: 80000,
    otherLandPalms: 34630,
    otherLandTreeOrchards: 44630,
    otherLandAgroforestry: 21852,
    otherLandTreesUrbanSettings: 1815,
    year: 2016,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 78519,
    otherWoodedLand: 28000,
    otherLand: 80000,
    otherLandPalms: 34815,
    otherLandTreeOrchards: 44815,
    otherLandAgroforestry: 21926,
    otherLandTreesUrbanSettings: 1807,
    year: 2017,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 80000,
    otherWoodedLand: 29000,
    otherLand: 80000,
    otherLandPalms: 35000,
    otherLandTreeOrchards: 45000,
    otherLandAgroforestry: 22000,
    otherLandTreesUrbanSettings: 1800,
    year: 2018,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 81481,
    otherWoodedLand: 30000,
    otherLand: 80000,
    otherLandPalms: 35185,
    otherLandTreeOrchards: 45185,
    otherLandAgroforestry: 22074,
    otherLandTreesUrbanSettings: 1793,
    year: 2019,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  },
  {
    forestArea: 82963,
    otherWoodedLand: 31000,
    otherLand: 80000,
    otherLandPalms: 35370,
    otherLandTreeOrchards: 45370,
    otherLandAgroforestry: 22148,
    otherLandTreesUrbanSettings: 1785,
    year: 2020,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
    otherLandEstimated: true,
    otherLandPalmsEstimated: true,
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettingsEstimated: true
  }
]

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
