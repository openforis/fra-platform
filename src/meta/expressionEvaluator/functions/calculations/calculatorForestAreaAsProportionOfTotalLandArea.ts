import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Objects } from 'utils/objects'

import { Context } from 'meta/expressionEvaluator/context'

type Year = number
type Data = Record<Year, Record<'extentOfForest' | 'totalLandArea', number>>

const minYear = 2020
const maxYear = 2025

// ---------- Helper utility functions

// Helper utility to create a data object
const _getData = (
  forestAreaData: Array<string> | undefined,
  totalLandAreaData: Array<string> | undefined
): { data: Data } => {
  const data = [0, 1, 2, 3, 4, 5].reduce<Data>((acc, i) => {
    const key = minYear + i
    // eslint-disable-next-line no-param-reassign
    acc[key] = {
      extentOfForest: parseFloat(forestAreaData[i]),
      totalLandArea: parseFloat(totalLandAreaData[i]),
    }

    return acc
  }, {} as Data)

  return { data }
}

// Helper utility to get the range of years
const _getRange = (data: Data, year: Year): { left: Year; right: Year } => {
  const years = Object.keys(data).reduce<Array<Year>>((acc, y) => {
    if (!Objects.isEmpty(data[Number(y)].extentOfForest)) acc.push(parseInt(y, 10))
    return acc
  }, [])

  const left = [...years].reverse().find((y) => y < year) || minYear
  const right = years.find((y) => y > year) || maxYear

  return { left, right }
}

const _getProportion = (a: number, b: number): number => {
  return (a / b) * 100
}

const _getYearProportion = (data: Data, year: Year): number => {
  const { extentOfForest, totalLandArea } = data[year]
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

      const { data } = _getData(forestAreaData, totalLandAreaData)

      // if we have value for current year
      if (data[year].extentOfForest && data[year].totalLandArea) {
        const { extentOfForest, totalLandArea } = data[year]
        return _getProportion(extentOfForest, totalLandArea)
      }

      const { left, right } = _getRange(data, year)

      const proportionLeft = _getYearProportion(data, left)
      const proportionRight = _getYearProportion(data, right)

      const proportion = proportionLeft + ((proportionRight - proportionLeft) * (year - left)) / (right - left)

      return proportion ?? null
    }
  },
}
