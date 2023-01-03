import { dataset1, dataset1Result } from './dataset1'
import { dataset2, dataset2Result } from './dataset2'
import { EstimationEngine, GenerateSpecMethod } from './estimationEngine'

const years = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020, 2025]

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

      const expected = dataset1Result['Interpolates and extrapolates linearly']

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

      const expected = dataset1Result['Extrapolates with repeat last value']

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
      const expected = dataset1Result['Extrapolates with annual change rate']
      expect(estimated).toStrictEqual(expected)
    })
  })

  describe('dataset2:', () => {
    test('1 - Linear - {1992, 2002}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet1, 'linear')

      const expected = dataset2Result['1 - Linear - {1992, 2002}']

      expect(estimated).toStrictEqual(expected)
    })
    test('1 - Repeat last - {1992, 2002}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet1, 'repeatLast')

      const expected = dataset2Result['1 - Repeat last - {1992, 2002}']

      expect(estimated).toStrictEqual(expected)
    })

    test('2 - Repeat last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet2, 'repeatLast')

      const expected = dataset2Result['2 - Repeat last - {1992, 2016}']

      expect(estimated).toStrictEqual(expected)
    })
    test('2 - Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet2, 'linear')

      const expected = dataset2Result['2 - Linear - {1992, 2016}']

      expect(estimated).toStrictEqual(expected)
    })

    test('3 - Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'linear')

      const expected = dataset2Result['3 - Linear - {1992, 2016}']

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Repeat Last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'repeatLast')

      const expected = dataset2Result['3 - Repeat Last - {1992, 2016}']

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Annual Change - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'annualChange', {
        forestArea: { ratePast: 200, rateFuture: 300 },
        otherWoodedLand: { ratePast: 300, rateFuture: 500 },
      })

      const expected = dataset2Result['3 - Annual Change - {1992, 2016}']

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Annual Change - {1992, 2016, negative values ratePast}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'annualChange', {
        forestArea: { ratePast: -200, rateFuture: 300 },
        otherWoodedLand: { ratePast: -300, rateFuture: 500 },
      })

      const expected = dataset2Result['3 - Annual Change - {1992, 2016, negative values ratePast}']

      expect(estimated).toStrictEqual(expected)
    })
    test('3 - Annual Change - {1992, 2016, negative values ratePast and rateFuture}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet3, 'annualChange', {
        forestArea: { ratePast: -1500, rateFuture: -3560 },
        otherWoodedLand: { ratePast: 501, rateFuture: -960 },
      })

      const expected = dataset2Result['3 - Annual Change - {1992, 2016, negative values ratePast and rateFuture}']

      expect(estimated).toStrictEqual(expected)
    })

    test('4 - Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet4, 'linear')
      const expected = dataset2Result['4 - Linear - {1992, 2016}']

      expect(estimated).toStrictEqual(expected)
    })
    test('4 - Repeat last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset2.mockOriginalDataPointSet4, 'repeatLast')
      const expected = dataset2Result['4 - Repeat last - {1992, 2016}']

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

      const expected = dataset2Result['4 - Annual Change - {1992, 2016}']

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

      const expected = dataset2Result['4 - Annual Change - {1992, 2016} - 2']

      expect(estimated).toStrictEqual(expected)
    })
  })
})
