import { useMemo } from 'react'

import { Axis, AxisSelection, AxisType } from 'meta/explorer/selection'
import { Objects } from 'utils/objects'

import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'

type Returned = Axis | null

export const getCountryAxis = (axisSelection: AxisSelection | undefined): Returned => {
  if (Objects.isNil(axisSelection)) return null

  const { x: xAxisSelection, y: yAxisSelection } = axisSelection

  if (xAxisSelection.includes(AxisType.countries)) return Axis.x
  if (yAxisSelection.includes(AxisType.countries)) return Axis.y

  return null
}

export const useCountryAxis = (): Returned => {
  const axisSelection = useExplorerAxisSelection()

  return useMemo<Returned>(() => getCountryAxis(axisSelection), [axisSelection])
}
