import { useMemo } from 'react'

import { Axis } from 'meta/explorer/selection'

import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'

import { useCountryAxis } from './useCountryAxis'

export const useCountryOptionsEnabled = (): boolean => {
  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()
  const countryAxis = useCountryAxis()

  return useMemo(() => {
    if (countryAxis === Axis.x) return xAxisSelection.length === 1
    if (countryAxis === Axis.y) return yAxisSelection.length === 1
    return false
  }, [countryAxis, xAxisSelection, yAxisSelection])
}
