import { useDeferredValue } from 'react'

import { RecordAssessmentData } from 'meta/data'
import { AxisSelection } from 'meta/explorer/selection'

import { useExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { AxisValues, Combination, UniquePrimaryAxis } from 'client/pages/Explorer/ResultGrid/types'

import { useAxisValues } from './useAxisValues'
import { useCellsExportAlways } from './useCellsExportAlways'
import { useCombinations } from './useCombinations'
import { useGridTemplateColumns } from './useGridTemplateColumns'

type Returned = {
  axisValues: AxisValues
  data: RecordAssessmentData
  gridTemplateColumns: string
  uniquePrimaryX: UniquePrimaryAxis
  xAxisSelection: AxisSelection['x']
  xCombinations: Array<Combination>
  yAxisSelection: AxisSelection['y']
  yCombinations: Array<Combination>
}

export const useDeferredGridData = (): Returned => {
  const { extraCols } = useCellsExportAlways()

  const rawData = useExplorerSectionData()
  const data = useDeferredValue(rawData)

  const rawAxisValues = useAxisValues()
  const axisValues = useDeferredValue(rawAxisValues)

  const {
    uniquePrimaryX: rawUniquePrimaryX,
    xCombinations: rawXCombinations,
    yCombinations: rawYCombinations,
  } = useCombinations({ axisValues })
  const uniquePrimaryX = useDeferredValue(rawUniquePrimaryX)
  const xCombinations = useDeferredValue(rawXCombinations)
  const yCombinations = useDeferredValue(rawYCombinations)

  const rawGridTemplateColumns = useGridTemplateColumns({ axisValues, extraCols })
  const gridTemplateColumns = useDeferredValue(rawGridTemplateColumns)

  const { x: rawXAxisSelection, y: rawYAxisSelection } = useExplorerAxisSelection()
  const xAxisSelection = useDeferredValue(rawXAxisSelection)
  const yAxisSelection = useDeferredValue(rawYAxisSelection)

  return {
    axisValues,
    data,
    gridTemplateColumns,
    uniquePrimaryX,
    xAxisSelection,
    xCombinations,
    yAxisSelection,
    yCombinations,
  }
}
