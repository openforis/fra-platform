import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { useExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'
import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'

export const useHideGrid = (): boolean => {
  const { tableName } = useExplorerSectionMetadata() ?? {}
  const explorerCountryIsos = useExplorerCountries()
  const measures = useExplorerMeasures()
  const dimensions = useExplorerDimensions()

  const data = useExplorerSectionData()

  const { x: xAxisSelection, y: yAxisSelection } = useExplorerAxisSelection()

  const xAxisVariableCount = xAxisSelection.length
  const yAxisVariableCount = yAxisSelection.length

  const hideGrid = useMemo<boolean>(
    () =>
      [explorerCountryIsos, data, dimensions, measures, tableName].some(Objects.isEmpty) ||
      xAxisVariableCount + yAxisVariableCount < 3,
    [data, dimensions, explorerCountryIsos, measures, tableName, xAxisVariableCount, yAxisVariableCount]
  )

  return hideGrid
}
