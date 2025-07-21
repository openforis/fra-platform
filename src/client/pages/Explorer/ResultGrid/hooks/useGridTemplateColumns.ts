import { useMemo } from 'react'

import { AxisType } from 'meta/explorer/selection'

import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { AxisValues } from 'client/pages/Explorer/ResultGrid/types'

type Props = {
  axisValues: AxisValues
  extraCols: number
}

type Returned = string

export const useGridTemplateColumns = (props: Props): Returned => {
  const { axisValues, extraCols } = props
  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()

  return useMemo<Returned>(() => {
    const headerCols = yAxisSelection
      .map((axisType) => {
        if (axisType === AxisType.measures) return '1fr'
        if (axisType === AxisType.countries) return 'minmax(200px, 240px)'
        return 'minmax(160px, 240px)'
      })
      .join(' ')
    const selectedXAxisA = xAxisSelection[0]
    const selectedXAxisB = xAxisSelection[1]
    let xAxisColCount = 0
    if (xAxisSelection.length === 2) {
      const lengthA = axisValues[selectedXAxisA]?.length ?? 0
      const lengthB = axisValues[selectedXAxisB]?.length ?? 0
      xAxisColCount = lengthA * lengthB
    } else if (xAxisSelection.length === 1) {
      xAxisColCount = axisValues[selectedXAxisA]?.length ?? 0
    }
    const bodyCols = `repeat(${xAxisColCount + extraCols}, 1fr)`
    return `${headerCols} ${bodyCols}`
  }, [axisValues, extraCols, xAxisSelection, yAxisSelection])
}
