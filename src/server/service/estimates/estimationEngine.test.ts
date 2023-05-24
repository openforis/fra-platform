import { UUIDs } from '@utils/uuids'

import { NodeValueEstimationMethod, NodeValuesEstimation } from '@meta/assessment'
import { NodeUpdate } from '@meta/data'

import { dataset1, dataset1Expected } from '@server/service/estimates/datasets/dataset1'
import { dataset2, dataset2Expected } from '@server/service/estimates/datasets/dataset2'
import { dataset3, dataset3Expected } from '@server/service/estimates/datasets/dataset3'
import { dataset4, dataset4Expected } from '@server/service/estimates/datasets/dataset4'
import { dataset5, dataset5Expected } from '@server/service/estimates/datasets/dataset5'
import { dataset6, dataset6Expected } from '@server/service/estimates/datasets/dataset6'

import { EstimationEngine, GenerateSpec, GenerateSpecMethod } from './estimationEngine'

const years = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020, 2025]

const _defaultFields = ['forestArea', 'otherWoodedLand']
const _defaultTableName = 'extentOfForest'

/**
 * @deprecated
 */
const generateSpecToEstimation = (props: { generateSpec: GenerateSpec }): NodeValuesEstimation => {
  const { generateSpec } = props

  const variables = generateSpec.fields.reduce<NodeValuesEstimation['variables']>((acc, field) => {
    const options = generateSpec.method === 'annualChange' ? { changeRates: generateSpec.changeRates?.[field] } : {}
    return { ...acc, [field]: options }
  }, {})

  return {
    method: generateSpec.method as NodeValueEstimationMethod,
    uuid: UUIDs.v4(),
    tableUuid: 'fake-table-uuid',
    variables,
  }
}

const _estimateWithDefaults = (
  dataset: any,
  method: GenerateSpecMethod,
  changeRates: Record<string, { rateFuture: number; ratePast: number }> = undefined
) => {
  const generateSpec = {
    method,
    changeRates,
    fields: _defaultFields,
  }
  return EstimationEngine.estimateValues(
    years,
    dataset,
    generateSpec,
    _defaultTableName,
    generateSpecToEstimation({ generateSpec })
  )
}

const verifyEstimation = (estimated: Array<NodeUpdate>, expected: Array<NodeUpdate>): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const actual = estimated.map(({ value: { estimationUuid, ...value }, ...nodeUpdate }) => ({
    ...nodeUpdate,
    value: { ...value },
  }))
  expect(actual).toStrictEqual(expected)
}

describe('Estimation Engine test:', () => {
  describe('dataset1:', () => {
    test('Interpolates and extrapolates linearly', () => {
      const generateSpec: GenerateSpec = {
        method: 'linear',
        fields: ['forestArea', 'otherWoodedLand'],
      }
      const estimated = EstimationEngine.estimateValues(
        years,
        dataset1,
        generateSpec,
        'extentOfForest',
        generateSpecToEstimation({ generateSpec })
      )

      const expected = dataset1Expected['Interpolates and extrapolates linearly']

      verifyEstimation(estimated, expected)
    })
  })
  describe('dataset2:', () => {
    test('Extrapolates with repeat last value', () => {
      const generateSpec: GenerateSpec = {
        method: 'repeatLast',
        fields: ['forestArea', 'otherWoodedLand'],
      }
      const estimated = EstimationEngine.estimateValues(
        years,
        dataset2,
        generateSpec,
        'extentOfForest',
        generateSpecToEstimation({ generateSpec })
      )

      const expected = dataset2Expected['Extrapolates with repeat last value']

      verifyEstimation(estimated, expected)
    })
    test('Extrapolates with annual change rate', () => {
      const generateSpec: GenerateSpec = {
        method: 'annualChange',
        changeRates: {
          forestArea: { ratePast: -10, rateFuture: 20 },
          otherWoodedLand: { ratePast: -5, rateFuture: 10 },
        },
        fields: ['forestArea', 'otherWoodedLand'],
      }
      const estimated = EstimationEngine.estimateValues(
        years,
        dataset2,
        generateSpec,
        'extentOfForest',
        generateSpecToEstimation({ generateSpec })
      )
      const expected = dataset2Expected['Extrapolates with annual change rate']
      verifyEstimation(estimated, expected)
    })
  })

  describe('dataset3:', () => {
    test('Linear - {1992, 2002}', () => {
      const estimated = _estimateWithDefaults(dataset3, 'linear')

      const expected = dataset3Expected['Linear - {1992, 2002}']

      verifyEstimation(estimated, expected)
    })
    test('Repeat last - {1992, 2002}', () => {
      const estimated = _estimateWithDefaults(dataset3, 'repeatLast')

      const expected = dataset3Expected['Repeat last - {1992, 2002}']

      verifyEstimation(estimated, expected)
    })
  })
  describe('dataset4:', () => {
    test('2 - Repeat last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset4, 'repeatLast')

      const expected = dataset4Expected['Repeat last - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
    test('2 - Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset4, 'linear')

      const expected = dataset4Expected['Linear - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
  })
  describe('dataset5:', () => {
    test('Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset5, 'linear')

      const expected = dataset5Expected['Linear - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
    test('Repeat Last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset5, 'repeatLast')

      const expected = dataset5Expected['Repeat Last - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
    test('Annual Change - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset5, 'annualChange', {
        forestArea: { ratePast: 200, rateFuture: 300 },
        otherWoodedLand: { ratePast: 300, rateFuture: 500 },
      })

      const expected = dataset5Expected['Annual Change - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
    test('Annual Change - {1992, 2016, negative values ratePast}', () => {
      const estimated = _estimateWithDefaults(dataset5, 'annualChange', {
        forestArea: { ratePast: -200, rateFuture: 300 },
        otherWoodedLand: { ratePast: -300, rateFuture: 500 },
      })

      const expected = dataset5Expected['Annual Change - {1992, 2016, negative values ratePast}']

      verifyEstimation(estimated, expected)
    })
    test('Annual Change - {1992, 2016, negative values ratePast and rateFuture}', () => {
      const estimated = _estimateWithDefaults(dataset5, 'annualChange', {
        forestArea: { ratePast: -1500, rateFuture: -3560 },
        otherWoodedLand: { ratePast: 501, rateFuture: -960 },
      })

      const expected = dataset5Expected['Annual Change - {1992, 2016, negative values ratePast and rateFuture}']

      verifyEstimation(estimated, expected)
    })
  })
  describe('dataset6:', () => {
    test('Linear - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset6, 'linear')
      const expected = dataset6Expected['Linear - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
    test('Repeat last - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset6, 'repeatLast')
      const expected = dataset6Expected['Repeat last - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
    test('Annual Change - {1992, 2016}', () => {
      const estimated = _estimateWithDefaults(dataset6, 'annualChange', {
        forestArea: {
          ratePast: -1150,
          rateFuture: 2200,
        },
        otherWoodedLand: {
          ratePast: 2345,
          rateFuture: -1500,
        },
      })

      const expected = dataset6Expected['Annual Change - {1992, 2016}']

      verifyEstimation(estimated, expected)
    })
    test('Annual Change - {1992, 2016} - 2', () => {
      const estimated = _estimateWithDefaults(dataset6, 'annualChange', {
        forestArea: {
          ratePast: 2500,
          rateFuture: -4500,
        },
        otherWoodedLand: {
          ratePast: -8900,
          rateFuture: 5890,
        },
      })

      const expected = dataset6Expected['Annual Change - {1992, 2016} - 2']

      verifyEstimation(estimated, expected)
    })
  })
})
