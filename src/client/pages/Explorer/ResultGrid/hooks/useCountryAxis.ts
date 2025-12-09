import { useMemo } from 'react'

import { Axis, AxisType } from 'meta/explorer/selection'

import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'

type Returned = Axis | null

export const useCountryAxis = (): Returned => {
  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()

  return useMemo<Returned>(() => {
    if (xAxisSelection.includes(AxisType.countries)) return Axis.x
    if (yAxisSelection.includes(AxisType.countries)) return Axis.y

    return null
  }, [xAxisSelection, yAxisSelection])
}
