import * as estimationEngine from './estimationEngine'

const fraYears = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020, 2025]

const testOdpSet1 = [
  {
    forestArea: 40000,
    otherWoodedLand: 2000,
    type: 'odp',
    year: 1991,
  },
  {
    forestArea: 80000,
    otherWoodedLand: 29000,
    type: 'odp',
    year: 2018,
  },
]

const testOdpSet2 = [
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
  },
]

const expectedEstimations1 = [
  {
    forestArea: '38518.52',
    forestAreaEstimated: true,
    otherWoodedLand: '1000.00',
    otherWoodedLandEstimated: true,
    year: 1990,
  },
  {
    forestArea: '53333.33',
    forestAreaEstimated: true,
    otherWoodedLand: '11000.00',
    otherWoodedLandEstimated: true,
    year: 2000,
  },
  {
    forestArea: '68148.15',
    forestAreaEstimated: true,
    otherWoodedLand: '21000.00',
    otherWoodedLandEstimated: true,
    year: 2010,
  },
  {
    forestArea: '75555.56',
    forestAreaEstimated: true,
    otherWoodedLand: '26000.00',
    otherWoodedLandEstimated: true,
    year: 2015,
  },
  {
    forestArea: '77037.04',
    forestAreaEstimated: true,
    otherWoodedLand: '27000.00',
    otherWoodedLandEstimated: true,
    year: 2016,
  },
  {
    forestArea: '78518.52',
    forestAreaEstimated: true,
    otherWoodedLand: '28000.00',
    otherWoodedLandEstimated: true,
    year: 2017,
  },
  {
    forestArea: '80000.00',
    forestAreaEstimated: true,
    otherWoodedLand: '29000.00',
    otherWoodedLandEstimated: true,
    year: 2018,
  },
  {
    forestArea: '81481.48',
    forestAreaEstimated: true,
    otherWoodedLand: '30000.00',
    otherWoodedLandEstimated: true,
    year: 2019,
  },
  {
    forestArea: '82962.96',
    forestAreaEstimated: true,
    otherWoodedLand: '31000.00',
    otherWoodedLandEstimated: true,
    year: 2020,
  },
  {
    forestArea: '90370.36',
    forestAreaEstimated: true,
    otherWoodedLand: '36000.00',
    otherWoodedLandEstimated: true,
    year: 2025,
  },
]

describe('Estimation Engine test:', () => {
  test('Interpolates and extrapolates linearly', () => {
    // @ts-ignore
    const estimated = estimationEngine.estimateFraValues(fraYears, testOdpSet1, {
      method: 'linear',
      fields: ['forestArea', 'otherWoodedLand'],
    })
    expect(estimated).toEqual(expectedEstimations1)
  })

  test('Extrapolates with repeat last value', () => {
    // @ts-ignore
    const estimated = estimationEngine.estimateFraValues(fraYears, testOdpSet2, {
      method: 'repeatLast',
      fields: ['forestArea', 'otherWoodedLand'],
    })
    const expected = [
      { forestArea: '500.00', otherWoodedLand: '300.00', year: 1990 },
      { forestArea: '500.00', otherWoodedLand: '300.00', year: 2000 },
      { forestArea: '497.78', otherWoodedLand: '304.89', year: 2010 },
      { forestArea: '486.67', otherWoodedLand: '329.33', year: 2015 },
      { forestArea: '484.45', otherWoodedLand: '334.22', year: 2016 },
      { forestArea: '482.23', otherWoodedLand: '339.11', year: 2017 },
      { forestArea: '480.00', otherWoodedLand: '344.00', year: 2018 },
      { forestArea: '480.00', otherWoodedLand: '344.00', year: 2019 },
      { forestArea: '480.00', otherWoodedLand: '344.00', year: 2020 },
      { forestArea: '480.00', otherWoodedLand: '344.00', year: 2025 },
    ]

    const estimatedPicked = estimated.map(({ forestArea, otherWoodedLand, year }) => ({
      forestArea,
      otherWoodedLand,
      year,
    }))

    expect(estimatedPicked).toStrictEqual(expected)
  })

  it('Extrapolates with annual change rate', () => {
    // @ts-ignore
    const estimated = estimationEngine.estimateFraValues(fraYears, testOdpSet2, {
      method: 'annualChange',
      changeRates: {
        forestArea: { ratePast: -10, rateFuture: 20 },
        otherWoodedLand: { ratePast: -5, rateFuture: 10 },
      },
      fields: ['forestArea', 'otherWoodedLand'],
    })
    const expected = [
      { forestArea: '690.00', otherWoodedLand: '395.00', year: 1990 },
      { forestArea: '590.00', otherWoodedLand: '345.00', year: 2000 },
      { forestArea: '497.78', otherWoodedLand: '304.89', year: 2010 },
      { forestArea: '486.67', otherWoodedLand: '329.33', year: 2015 },
      { forestArea: '484.45', otherWoodedLand: '334.22', year: 2016 },
      { forestArea: '482.23', otherWoodedLand: '339.11', year: 2017 },
      { forestArea: '480.00', otherWoodedLand: '344.00', year: 2018 },
      { forestArea: '500.00', otherWoodedLand: '354.00', year: 2019 },
      { forestArea: '520.00', otherWoodedLand: '364.00', year: 2020 },
      { forestArea: '620.00', otherWoodedLand: '414.00', year: 2025 },
    ]
    const estimatedPicked = estimated.map(({ forestArea, otherWoodedLand, year }) => ({
      forestArea,
      otherWoodedLand,
      year,
    }))

    expect(estimatedPicked).toStrictEqual(expected)
  })
})
