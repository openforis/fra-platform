import { useMemo } from 'react'

import { AxisType } from 'meta/explorer/selection'

import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { useCountryEntries } from 'client/pages/Explorer/ResultGrid/hooks/useCountryEntries'
import { AxisValues } from 'client/pages/Explorer/ResultGrid/types'

type Returned = AxisValues

export const useAxisValues = (): Returned => {
  const countryEntries = useCountryEntries()
  const dimensions = useExplorerDimensions()
  const measures = useExplorerMeasures()

  return useMemo<Returned>(
    () => ({
      [AxisType.countries]: countryEntries,
      [AxisType.dimensions]: dimensions,
      [AxisType.measures]: measures,
    }),
    [countryEntries, dimensions, measures]
  )
}
