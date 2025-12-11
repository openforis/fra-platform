import { useMemo } from 'react'

import { Axis, AxisSelection } from 'meta/explorer/selection'

import { getCountryAxis } from './useCountryAxis'

type Props = {
  axisSelection: AxisSelection
}

type Returned = boolean

export const useCountryOptionsEnabled = (props: Props): Returned => {
  const { axisSelection } = props

  return useMemo<Returned>(() => {
    const { x: xAxisSelection, y: yAxisSelection } = axisSelection ?? {}
    const countryAxis = getCountryAxis(axisSelection)

    if (countryAxis === Axis.x) return xAxisSelection.length === 1
    if (countryAxis === Axis.y) return yAxisSelection.length === 1
    return false
  }, [axisSelection])
}
