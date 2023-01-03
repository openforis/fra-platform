import { EstimationEngine, GenerateSpecMethod } from './estimationEngine'

const years = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020, 2025]

const _defaultOtherWoodedLand = '20.00'
const _defaultFields = ['forestArea', 'otherWoodedLand']
const _defaultTableName = 'extentOfForest'

const _estimateWithDefaults = (
  dataset: any,
  method: GenerateSpecMethod,
  changeRates: Record<string, { rateFuture: number; ratePast: number }> = undefined
) => {
  return EstimationEngine.estimateValues(
    years,
    dataset,
    {
      method,
      changeRates,
      fields: _defaultFields,
    },
    _defaultTableName
  )
}

const dataset1 = {
  mockOriginalDataPointSet1: {
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
  },
  mockOriginalDataPointSet2: {
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
  },
}

const _getODP = (forestArea: string, otherWoodedLand: string = _defaultOtherWoodedLand) => ({
  forestArea: {
    odp: true,
    raw: forestArea,
  },
  otherWoodedLand: {
    odp: true,
    raw: otherWoodedLand,
  },
})
const dataset2 = {
  mockOriginalDataPointSet1: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2002': _getODP('1750'),
      },
    },
  },
  mockOriginalDataPointSet2: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2012': _getODP('1750'),
      },
    },
  },
  mockOriginalDataPointSet3: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2016': _getODP('1750'),
      },
    },
  },
  mockOriginalDataPointSet4: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2016': _getODP('2750'),
      },
    },
  },
}

describe('Estimation Engine test:', () => {
  describe('dataset1:', () => {
    test('Interpolates and extrapolates linearly', () => {
      const estimated = EstimationEngine.estimateValues(
        years,
        dataset1.mockOriginalDataPointSet1,
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
        dataset1.mockOriginalDataPointSet2,
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
        dataset1.mockOriginalDataPointSet2,
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

  describe('dataset2:', () => {
    test('1 - Linear - {1992, 2002}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet1, 'linear')

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1786.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1756.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1726.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1711.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1708.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1705.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1702.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1699.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1696.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1681.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('1 - Repeat last - {1992, 2002}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet1, 'repeatLast')

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1780.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1756.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })

    test('2 - Repeat last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet2, 'repeatLast')

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1780.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1768.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1753.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('2 - Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet2, 'linear')

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1783.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1768.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1753.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1745.50',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1744.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1742.50',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1741.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1739.50',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1738.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1730.50',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })

    test('3 - Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'linear')

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1782.50',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1770.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1757.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1751.25',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1748.75',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1747.50',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1746.25',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1745.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1738.75',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Repeat Last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'repeatLast')

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1780.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1770.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1757.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1751.25',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Annual Change - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'annualChange', {
        forestArea: { ratePast: 200, rateFuture: 300 },
        otherWoodedLand: { ratePast: 300, rateFuture: 500 },
      })

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1380.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-580.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1770.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1757.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1751.25',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2050.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '520.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2350.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '1020.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2650.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '1520.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2950.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '2020.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '4450.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '4520.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Annual Change - {1992, 2016, negative values ratePast}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'annualChange', {
        forestArea: { ratePast: -200, rateFuture: 300 },
        otherWoodedLand: { ratePast: -300, rateFuture: 500 },
      })

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2180.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '620.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1770.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1757.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1751.25',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2050.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '520.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2350.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '1020.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2650.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '1520.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2950.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '2020.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '4450.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '4520.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Annual Change - {1992, 2016, negative values ratePast and rateFuture}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'annualChange', {
        forestArea: { ratePast: -1500, rateFuture: -3560 },
        otherWoodedLand: { ratePast: 501, rateFuture: -960 },
      })

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '4780.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-982.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1770.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1757.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1751.25',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-1810.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-940.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-5370.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-1900.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-8930.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-2860.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-12490.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-3820.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-30290.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-8620.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })

    test('4 - Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet4, 'linear')
      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1699.17',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2103.33',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2507.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2709.58',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2790.42',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2830.84',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2871.26',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2911.68',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '3113.78',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('4 - Repeat last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet4, 'repeatLast')
      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '1780.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2103.33',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2507.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2709.58',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('4 - Annual Change - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet4, 'annualChange', {
        forestArea: {
          ratePast: -1150,
          rateFuture: 2200,
        },
        otherWoodedLand: {
          ratePast: 2345,
          rateFuture: -1500,
        },
      })

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '4080.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-4670.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2103.33',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2507.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2709.58',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '4950.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-1480.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '7150.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-2980.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '9350.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-4480.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '11550.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-5980.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '22550.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '-13480.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
    test('4 - Annual Change - {1992, 2016} - 2', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet4, 'annualChange', {
        forestArea: {
          ratePast: 2500,
          rateFuture: -4500,
        },
        otherWoodedLand: {
          ratePast: -8900,
          rateFuture: 5890,
        },
      })

      const expected = [
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-3220.00',
            estimated: true,
          },
        },
        {
          colName: '1990',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '17820.00',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2103.33',
            estimated: true,
          },
        },
        {
          colName: '2000',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2507.50',
            estimated: true,
          },
        },
        {
          colName: '2010',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2709.58',
            estimated: true,
          },
        },
        {
          colName: '2015',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '2750.00',
            estimated: true,
          },
        },
        {
          colName: '2016',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '20.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-1750.00',
            estimated: true,
          },
        },
        {
          colName: '2017',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '5910.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-6250.00',
            estimated: true,
          },
        },
        {
          colName: '2018',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '11800.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-10750.00',
            estimated: true,
          },
        },
        {
          colName: '2019',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '17690.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-15250.00',
            estimated: true,
          },
        },
        {
          colName: '2020',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '23580.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'forestArea',
          value: {
            raw: '-37750.00',
            estimated: true,
          },
        },
        {
          colName: '2025',
          tableName: 'extentOfForest',
          variableName: 'otherWoodedLand',
          value: {
            raw: '53030.00',
            estimated: true,
          },
        },
      ]

      expect(estimated).toStrictEqual(expected)
    })
  })
})
