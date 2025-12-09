import { useMemo } from 'react'

import { Axis, AxisType } from 'meta/explorer/selection'

import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'

type Returned = {
  axisWithCountries: Axis | null
  enabled: boolean
}

export const useCountryOptionsAvailability = (): Returned => {
  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()

  return useMemo<Returned>(() => {
    const countriesOnX = xAxisSelection.includes(AxisType.countries)
    const countriesOnY = yAxisSelection.includes(AxisType.countries)

    const xOnly = countriesOnX && xAxisSelection.length === 1
    const yOnly = countriesOnY && yAxisSelection.length === 1

    if (xOnly) return { axisWithCountries: Axis.x, enabled: true }
    if (yOnly) return { axisWithCountries: Axis.y, enabled: true }

    return { axisWithCountries: null, enabled: false }
  }, [xAxisSelection, yAxisSelection])
}
