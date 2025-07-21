import { useCallback, useMemo } from 'react'

import { Objects } from 'utils/objects'

import { AxisType } from 'meta/explorer/selection'

import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { AxisValues, Combination, UniquePrimaryAxis } from 'client/pages/Explorer/ResultGrid/types'

type BuildCombinations = (axisSelection: Array<AxisType>) => Array<Combination>

type Props = {
  axisValues: AxisValues
}

type Returned = {
  uniquePrimaryX: UniquePrimaryAxis
  xCombinations: Array<Combination>
  yCombinations: Array<Combination>
}

export const useCombinations = (props: Props): Returned => {
  const { axisValues } = props
  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()

  /**
   * Build all the combination tuples for a given axis selection.
   *
   * - For example, if the axis selection is x: [measures, dimensions], y: [countries]
   *  then the combinations are:
   * - xCombinations: [['forestArea', '2000'], ['forestArea', '2010'], …, ['otherWoodedLand', '2000'], …]
   * - yCombinations: [[CountryEnty1], [CountryEntry2], …]
   */
  const buildCombinations = useCallback<BuildCombinations>(
    (axisSelection) => {
      if (Objects.isEmpty(axisSelection)) return []
      const [primaryVariable, secondaryVariable] = axisSelection
      if (axisSelection.length === 1) return axisValues[primaryVariable].map((v) => [v])
      return axisValues[primaryVariable].flatMap((a) => axisValues[secondaryVariable].map((b) => [a, b]))
    },
    [axisValues]
  )

  const xCombinations = useMemo<Array<Combination>>(
    () => buildCombinations(xAxisSelection),
    [buildCombinations, xAxisSelection]
  )
  const yCombinations = useMemo<Array<Combination>>(
    () => buildCombinations(yAxisSelection),
    [buildCombinations, yAxisSelection]
  )

  /**
   * Get the unique primary axis values from the combinations.
   *
   * If the X combinations are:
   * [['forestArea', '2000'], ['forestArea', '2010'], …, ['otherWoodedLand', '2000'], …]
   * Then the unique primary axis values are:
   * ['forestArea', 'otherWoodedLand']
   */
  const uniquePrimaryX = useMemo<UniquePrimaryAxis>(
    () =>
      xAxisSelection.length === 2 ? (Array.from(new Set(xCombinations.map(([a]) => a))) as UniquePrimaryAxis) : [],
    [xAxisSelection, xCombinations]
  )

  return { uniquePrimaryX, xCombinations, yCombinations }
}
