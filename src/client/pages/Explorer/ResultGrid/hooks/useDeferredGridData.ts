import { useDeferredValue } from 'react'

import { RecordAssessmentData } from 'meta/data'
import { Axis, AxisSelection } from 'meta/explorer/selection'

import { useExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { AxisValues, CellExportAlways, Combination, UniquePrimaryAxis } from 'client/pages/Explorer/ResultGrid/types'

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
  cellsExportAlways: Array<CellExportAlways>
  cellsExportAlwaysAxis: Axis
}

export const useDeferredGridData = (): Returned => {
  const {
    cellsExportAlways: rawCellsExportAlways,
    cellsExportAlwaysAxis: rawCellsExportAlwaysAxis,
    extraCols,
  } = useCellsExportAlways()

  const cellsExportAlways = useDeferredValue(rawCellsExportAlways)
  const cellsExportAlwaysAxis = useDeferredValue(rawCellsExportAlwaysAxis)

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
    cellsExportAlways,
    cellsExportAlwaysAxis,
    data,
    gridTemplateColumns,
    uniquePrimaryX,
    xAxisSelection,
    xCombinations,
    yAxisSelection,
    yCombinations,
  }
}
