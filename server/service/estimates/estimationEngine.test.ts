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

    const expected = [
      {
        colName: '1990',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '38518.52' },
        variableName: 'forestArea',
      },
      {
        colName: '1990',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '1000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2000',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '53333.33' },
        variableName: 'forestArea',
      },
      {
        colName: '2000',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '11000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2010',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '68148.15' },
        variableName: 'forestArea',
      },
      {
        colName: '2010',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '21000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2015',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '75555.56' },
        variableName: 'forestArea',
      },
      {
        colName: '2015',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '26000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2016',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '77037.04' },
        variableName: 'forestArea',
      },
      {
        colName: '2016',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '27000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2017',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '78518.52' },
        variableName: 'forestArea',
      },
      {
        colName: '2017',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '28000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2018',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '80000.00' },
        variableName: 'forestArea',
      },
      {
        colName: '2018',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '29000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2019',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '81481.48' },
        variableName: 'forestArea',
      },
      {
        colName: '2019',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '30000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2020',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '82962.96' },
        variableName: 'forestArea',
      },
      {
        colName: '2020',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '31000.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2025',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '90370.36' },
        variableName: 'forestArea',
      },
      {
        colName: '2025',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '36000.00' },
        variableName: 'otherWoodedLand',
      },
    ]

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

    const expected = [
      {
        colName: '1990',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '500.00' },
        variableName: 'forestArea',
      },
      {
        colName: '1990',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '300.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2000',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '500.00' },
        variableName: 'forestArea',
      },
      {
        colName: '2000',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '300.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2010',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '497.78' },
        variableName: 'forestArea',
      },
      {
        colName: '2010',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '304.89' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2015',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '486.67' },
        variableName: 'forestArea',
      },
      {
        colName: '2015',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '329.33' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2016',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '484.45' },
        variableName: 'forestArea',
      },
      {
        colName: '2016',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '334.22' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2017',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '482.23' },
        variableName: 'forestArea',
      },
      {
        colName: '2017',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '339.11' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2018',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '480.00' },
        variableName: 'forestArea',
      },
      {
        colName: '2018',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '344.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2019',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '480.00' },
        variableName: 'forestArea',
      },
      {
        colName: '2019',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '344.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2020',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '480.00' },
        variableName: 'forestArea',
      },
      {
        colName: '2020',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '344.00' },
        variableName: 'otherWoodedLand',
      },
      {
        colName: '2025',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '480.00' },
        variableName: 'forestArea',
      },
      {
        colName: '2025',

        tableName: 'extentOfForest',
        value: { estimated: true, raw: '344.00' },
        variableName: 'otherWoodedLand',
      },
    ]

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
    const expected = [
      {
        colName: '1990',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '690.00', estimated: true },
      },
      {
        colName: '1990',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '395.00', estimated: true },
      },
      {
        colName: '2000',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '590.00', estimated: true },
      },
      {
        colName: '2000',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '345.00', estimated: true },
      },
      {
        colName: '2010',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '497.78', estimated: true },
      },
      {
        colName: '2010',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '304.89', estimated: true },
      },
      {
        colName: '2015',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '486.67', estimated: true },
      },
      {
        colName: '2015',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '329.33', estimated: true },
      },
      {
        colName: '2016',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '484.45', estimated: true },
      },
      {
        colName: '2016',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '334.22', estimated: true },
      },
      {
        colName: '2017',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '482.23', estimated: true },
      },
      {
        colName: '2017',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '339.11', estimated: true },
      },
      {
        colName: '2018',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '480.00', estimated: true },
      },
      {
        colName: '2018',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '344.00', estimated: true },
      },
      {
        colName: '2019',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '500.00', estimated: true },
      },
      {
        colName: '2019',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '354.00', estimated: true },
      },
      {
        colName: '2020',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '520.00', estimated: true },
      },
      {
        colName: '2020',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '364.00', estimated: true },
      },
      {
        colName: '2025',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        value: { raw: '620.00', estimated: true },
      },
      {
        colName: '2025',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
        value: { raw: '414.00', estimated: true },
      },
    ]
    expect(estimated).toStrictEqual(expected)
  })
})
