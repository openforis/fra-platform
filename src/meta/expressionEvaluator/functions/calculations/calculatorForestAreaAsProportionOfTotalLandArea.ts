import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from 'meta/expressionEvaluator/context'

type Year = number
type Data = Record<Year, Record<'extentOfForest' | 'totalLandArea', number>>

const baseYear = 2020
const maxYear = 2025

// ---------- Helper utility functions

// Helper utility to create a data object
const _getData = (
  forestAreaData: Array<string> | undefined,
  totalLandAreaData: Array<string> | undefined
): { data: Data; latestYear: Year } => {
  const baseYear = 2020
  let latestYear = null
  const data = [0, 1, 2, 3].reduce<Data>((acc, i) => {
    const key = baseYear + i + 1
    // eslint-disable-next-line no-param-reassign
    acc[key] = {
      extentOfForest: parseFloat(forestAreaData[i]),
      totalLandArea: parseFloat(totalLandAreaData[i]),
    }

    if (forestAreaData[i]) latestYear = key

    return acc
  }, {} as Data)

  return { data, latestYear }
}

const _getValueForYear = (data: Data, year: Year): Record<'extentOfForest' | 'totalLandArea', number> => {
  return data[year]
}

const _getProportion = (a: number, b: number): number => {
  return (a / b) * 100
}

const _getBaseProportion = (data: Data): number => {
  const { extentOfForest, totalLandArea } = data[baseYear]
  return _getProportion(extentOfForest, totalLandArea)
}

/**
 * @name calculatorForestAreaAsProportionOfTotalLandArea
 * @description
 * Calculates the forest area as a proportion of the total land area.
 * Primarily used for Section 8 Table SDG 15.1.1.
 *
 * @param {string} year - The year of the calculation.
 * @param {Array<string>} valuesExtentOfForest - The values of the extent of forest subcategories for years 2020...2025
 * @param {Array<string>} valuesTotalLandArea - The values of the total land area subcategories for years 2020...2025
 */
export const calculatorForestAreaAsProportionOfTotalLandArea: ExpressionFunction<Context> = {
  name: 'calculatorForestAreaAsProportionOfTotalLandArea',
  minArity: 2,
  executor: () => {
    return (
      year: Year | undefined,
      forestAreaData: Array<string> | undefined,
      totalLandAreaData: Array<string> | undefined
      // TODO: Arena-core/JSEP Doesn't support object format, see issue #3426
      // data: Record<Year, Record<'extentOfForest' | 'totalLandArea', string>> | undefined
    ): number => {
      if (!year || !forestAreaData?.length || !totalLandAreaData?.length) return null

      const { data, latestYear } = _getData(forestAreaData, totalLandAreaData)

      const baseProportion = _getBaseProportion(data)

      if (latestYear && latestYear <= year) {
        const { extentOfForest: forestAreaX, totalLandArea: totalForestAreaX } = _getValueForYear(data, latestYear)
        const proportionX = _getProportion(forestAreaX, totalForestAreaX)

        return baseProportion + ((proportionX - baseProportion) / (latestYear - baseYear)) * (year - baseYear)
      }

      const { extentOfForest: forestArea2025, totalLandArea: totalLandArea2025 } = _getValueForYear(data, maxYear)
      const proportion2025 = _getProportion(forestArea2025, totalLandArea2025)

      if (baseProportion > 0 && proportion2025 > 0) {
        return baseProportion + ((proportion2025 - baseProportion) / (maxYear - baseYear)) * (year - baseYear)
      }

      return null
    }
  },
}
