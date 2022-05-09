import { EstimationEngine } from './estimationEngine'

const years = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020, 2025]

const mockOriginalDataPointSet1 = {
  FIN: {
    originalDataPointValue: {
      '1991': {
        forestArea: {
          odp: true,
          raw: '40000',
        },
        otherWoodedLand: {
          odp: true,
          raw: '2000',
        },
      },
      '2018': {
        forestArea: {
          odp: true,
          raw: '80000.00000000000000000000',
        },
        otherWoodedLand: {
          odp: true,
          raw: '29000.00000000000000000000',
        },
      },
    },
  },
}

const mockOriginalDataPointSet2 = {
  FIN: {
    originalDataPointValue: {
      '2009': {
        forestArea: {
          odp: true,
          raw: '500',
        },
        otherWoodedLand: {
          odp: true,
          raw: '300',
        },
      },
      '2018': {
        forestArea: {
          odp: true,
          raw: '480.00000000000000000000',
        },
        otherWoodedLand: {
          odp: true,
          raw: '344.00000000000000000000',
        },
      },
    },
  },
}

describe('Estimation Engine test:', () => {
  test('Interpolates and extrapolates linearly', () => {
    const estimated = EstimationEngine.estimateValues(
      years,
      mockOriginalDataPointSet1,
      {
        method: 'linear',
        fields: ['forestArea', 'otherWoodedLand'],
      },
      'extentOfForest'
    )

    const expected = {
      FIN: {
        extentOfForest: {
          '1990': {
            forestArea: { estimated: true, raw: '38518.52' },
            otherWoodedLand: { estimated: true, raw: '1000.00' },
          },
          '2000': {
            forestArea: { estimated: true, raw: '53333.33' },
            otherWoodedLand: { estimated: true, raw: '11000.00' },
          },
          '2010': {
            forestArea: { estimated: true, raw: '68148.15' },
            otherWoodedLand: { estimated: true, raw: '21000.00' },
          },
          '2015': {
            forestArea: { estimated: true, raw: '75555.56' },
            otherWoodedLand: { estimated: true, raw: '26000.00' },
          },
          '2016': {
            forestArea: { estimated: true, raw: '77037.04' },
            otherWoodedLand: { estimated: true, raw: '27000.00' },
          },
          '2017': {
            forestArea: { estimated: true, raw: '78518.52' },
            otherWoodedLand: { estimated: true, raw: '28000.00' },
          },
          '2018': {
            forestArea: { estimated: true, raw: '80000.00' },
            otherWoodedLand: { estimated: true, raw: '29000.00' },
          },
          '2019': {
            forestArea: { estimated: true, raw: '81481.48' },
            otherWoodedLand: { estimated: true, raw: '30000.00' },
          },
          '2020': {
            forestArea: { estimated: true, raw: '82962.96' },
            otherWoodedLand: { estimated: true, raw: '31000.00' },
          },
          '2025': {
            forestArea: { estimated: true, raw: '90370.36' },
            otherWoodedLand: { estimated: true, raw: '36000.00' },
          },
        },
      },
    }

    expect(estimated).toStrictEqual(expected)
  })

  test('Extrapolates with repeat last value', () => {
    const estimated = EstimationEngine.estimateValues(
      years,
      mockOriginalDataPointSet2,
      {
        method: 'repeatLast',
        fields: ['forestArea', 'otherWoodedLand'],
      },
      'extentOfForest'
    )

    const expected = {
      FIN: {
        extentOfForest: {
          '1990': {
            forestArea: { estimated: true, raw: '500.00' },
            otherWoodedLand: { estimated: true, raw: '300.00' },
          },
          '2000': {
            forestArea: { estimated: true, raw: '500.00' },
            otherWoodedLand: { estimated: true, raw: '300.00' },
          },
          '2010': {
            forestArea: { estimated: true, raw: '497.78' },
            otherWoodedLand: { estimated: true, raw: '304.89' },
          },
          '2015': {
            forestArea: { estimated: true, raw: '486.67' },
            otherWoodedLand: { estimated: true, raw: '329.33' },
          },
          '2016': {
            forestArea: { estimated: true, raw: '484.45' },
            otherWoodedLand: { estimated: true, raw: '334.22' },
          },
          '2017': {
            forestArea: { estimated: true, raw: '482.23' },
            otherWoodedLand: { estimated: true, raw: '339.11' },
          },
          '2018': {
            forestArea: { estimated: true, raw: '480.00' },
            otherWoodedLand: { estimated: true, raw: '344.00' },
          },
          '2019': {
            forestArea: { estimated: true, raw: '480.00' },
            otherWoodedLand: { estimated: true, raw: '344.00' },
          },
          '2020': {
            forestArea: { estimated: true, raw: '480.00' },
            otherWoodedLand: { estimated: true, raw: '344.00' },
          },
          '2025': {
            forestArea: { estimated: true, raw: '480.00' },
            otherWoodedLand: { estimated: true, raw: '344.00' },
          },
        },
      },
    }

    expect(estimated).toStrictEqual(expected)
  })

  test('Extrapolates with annual change rate', () => {
    const estimated = EstimationEngine.estimateValues(
      years,
      mockOriginalDataPointSet2,
      {
        method: 'annualChange',
        changeRates: {
          forestArea: { ratePast: -10, rateFuture: 20 },
          otherWoodedLand: { ratePast: -5, rateFuture: 10 },
        },
        fields: ['forestArea', 'otherWoodedLand'],
      },
      'extentOfForest'
    )
    const expected = {
      FIN: {
        extentOfForest: {
          '1990': {
            forestArea: { estimated: true, raw: '690.00' },
            otherWoodedLand: { estimated: true, raw: '395.00' },
          },
          '2000': {
            forestArea: { estimated: true, raw: '590.00' },
            otherWoodedLand: { estimated: true, raw: '345.00' },
          },
          '2010': {
            forestArea: { estimated: true, raw: '497.78' },
            otherWoodedLand: { estimated: true, raw: '304.89' },
          },
          '2015': {
            forestArea: { estimated: true, raw: '486.67' },
            otherWoodedLand: { estimated: true, raw: '329.33' },
          },
          '2016': {
            forestArea: { estimated: true, raw: '484.45' },
            otherWoodedLand: { estimated: true, raw: '334.22' },
          },
          '2017': {
            forestArea: { estimated: true, raw: '482.23' },
            otherWoodedLand: { estimated: true, raw: '339.11' },
          },
          '2018': {
            forestArea: { estimated: true, raw: '480.00' },
            otherWoodedLand: { estimated: true, raw: '344.00' },
          },
          '2019': {
            forestArea: { estimated: true, raw: '500.00' },
            otherWoodedLand: { estimated: true, raw: '354.00' },
          },
          '2020': {
            forestArea: { estimated: true, raw: '520.00' },
            otherWoodedLand: { estimated: true, raw: '364.00' },
          },
          '2025': {
            forestArea: { estimated: true, raw: '620.00' },
            otherWoodedLand: { estimated: true, raw: '414.00' },
          },
        },
      },
    }
    expect(estimated).toStrictEqual(expected)
  })
})
