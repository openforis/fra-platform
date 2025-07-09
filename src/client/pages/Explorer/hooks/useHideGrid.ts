import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { useExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { useCountryEntries } from 'client/pages/Explorer/ResultGrid/hooks/useCountryEntries'

export const useHideGrid = (): boolean => {
  const { tableName } = useExplorerSectionMetadata() ?? {}
  const countryEntries = useCountryEntries()
  const measures = useExplorerMeasures()
  const dimensions = useExplorerDimensions()

  const data = useExplorerSectionData()

  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()

  const xAxisVariableCount = xAxisSelection.length
  const yAxisVariableCount = yAxisSelection.length

  const hideGrid = useMemo<boolean>(
    () =>
      [countryEntries, data, dimensions, measures, tableName].some(Objects.isEmpty) ||
      xAxisVariableCount + yAxisVariableCount < 3,
    [countryEntries, data, dimensions, measures, tableName, xAxisVariableCount, yAxisVariableCount]
  )

  return hideGrid
}
