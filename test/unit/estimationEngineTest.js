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
    forestArea: '38518.52',
    forestAreaEstimated: true,
    otherWoodedLand: '1000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '29814.81',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '39814.81',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '19925.93',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '2007.41',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 1990
  },
  {
    forestArea: '53333.33',
    forestAreaEstimated: true,
    otherWoodedLand: '11000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '31666.67',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '41666.67',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '20666.67',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1933.33',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2000
  },
  {
    forestArea: '68148.15',
    forestAreaEstimated: true,
    otherWoodedLand: '21000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '33518.52',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '43518.52',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '21407.41',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1859.26',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2010
  },
  {
    forestArea: '75555.56',
    forestAreaEstimated: true,
    otherWoodedLand: '26000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '34444.45',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '44444.45',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '21777.78',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1822.22',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2015
  },
  {
    forestArea: '77037.04',
    forestAreaEstimated: true,
    otherWoodedLand: '27000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '34629.63',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '44629.63',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '21851.85',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1814.81',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2016
  },
  {
    forestArea: '78518.52',
    forestAreaEstimated: true,
    otherWoodedLand: '28000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '34814.82',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '44814.82',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '21925.93',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1807.41',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2017
  },
  {
    forestArea: '80000.00',
    forestAreaEstimated: true,
    otherWoodedLand: '29000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '35000.00',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '45000.00',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '22000.00',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1800.00',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2018
  },
  {
    forestArea: '81481.48',
    forestAreaEstimated: true,
    otherWoodedLand: '30000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '35185.18',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '45185.18',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '22074.07',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1792.59',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2019
  },
  {
    forestArea: '82962.96',
    forestAreaEstimated: true,
    otherWoodedLand: '31000.00',
    otherWoodedLandEstimated: true,
    otherLand: '80000.00',
    otherLandEstimated: true,
    otherLandPalms: '35370.36',
    otherLandPalmsEstimated: true,
    otherLandTreeOrchards: '45370.36',
    otherLandTreeOrchardsEstimated: true,
    otherLandAgroforestry: '22148.14',
    otherLandAgroforestryEstimated: true,
    otherLandTreesUrbanSettings: '1785.18',
    otherLandTreesUrbanSettingsEstimated: true,
    year: 2020
  }
]

describe('estimationEngine', () => {
  it('Interpolates and extrapolates linearly', () => {
    const estimated = estimationEngine.estimateFraValues(
      fraYears,
      testOdpSet1,
      estimationEngine.eofFields,
      {method: 'linear'}
    )
    assert.deepEqual(expectedEstimations1, estimated)
  })
  it('Extrapolates with repeat last value', () => {

    const odps = [
      {
        forestArea: 500,
        otherWoodedLand: 300,
        type: 'odp',
        year: 2009,
      },
      {
        forestArea: 480,
        otherWoodedLand: 344,
        type: 'odp',
        year: 2018,
      }]

    const estimated = estimationEngine.estimateFraValues(
      fraYears,
      odps,
      ['forestArea', 'otherWoodedLand'],
      {method: 'repeatLast'}
    )
    assert.deepEqual(
      [ { forestArea: '500.00', otherWoodedLand: '300.00', year: 1990 },
        { forestArea: '500.00', otherWoodedLand: '300.00', year: 2000 },
        { forestArea: '497.78', otherWoodedLand: '304.89', year: 2010 },
        { forestArea: '486.67', otherWoodedLand: '329.33', year: 2015 },
        { forestArea: '484.45', otherWoodedLand: '334.22', year: 2016 },
        { forestArea: '482.23', otherWoodedLand: '339.11', year: 2017 },
        { forestArea: '480.00', otherWoodedLand: '344.00', year: 2018 },
        { forestArea: '480.00', otherWoodedLand: '344.00', year: 2019 },
        { forestArea: '480.00', otherWoodedLand: '344.00', year: 2020 }
      ],
      R.map(R.pickAll(['forestArea', 'otherWoodedLand', 'year']), estimated)
    )
  })
})
