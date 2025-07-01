import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Axis, AxisType } from 'meta/explorer/selection'
import { DimensionName } from 'meta/measurement/dimension'
import { Dimensions } from 'meta/measurement/dimensions'
import { MeasureName } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'

type CellExportAlways = {
  dimensionName: DimensionName
  measureName: MeasureName
}

type Returned = {
  cellsExportAlways: Array<CellExportAlways>
  cellsExportAlwaysAxis: Axis
  extraCols: number
}

export const useCellsExportAlways = (): Returned => {
  const { x: xAxisSelection } = useExplorerAxisSelection()
  const { cellsExportAlways: cellsExportAlwaysRecords = [] } = useExplorerSectionMetadata() ?? {}

  return useMemo<Returned>(() => {
    const returnDefault: Returned = {
      cellsExportAlwaysAxis: Axis.x,
      cellsExportAlways: [],
      extraCols: 0,
    }

    if (Objects.isEmpty(cellsExportAlwaysRecords)) return returnDefault

    const measuresExportAlways = Measures.getExportAlways(cellsExportAlwaysRecords)
    const dimensionsExportAlways = Dimensions.getExportAlways(cellsExportAlwaysRecords)

    const measuresAxis = xAxisSelection.includes(AxisType.measures) ? Axis.x : Axis.y
    const dimensionsAxis = xAxisSelection.includes(AxisType.dimensions) ? Axis.x : Axis.y

    if (measuresAxis !== dimensionsAxis) {
      return returnDefault
    }

    const cellsExportAlways = measuresExportAlways.map((measureName, idx) => ({
      measureName,
      dimensionName: dimensionsExportAlways[idx],
    }))

    if (measuresAxis === Axis.x) {
      return { cellsExportAlwaysAxis: Axis.x, cellsExportAlways, extraCols: cellsExportAlways.length }
    }

    return { cellsExportAlwaysAxis: Axis.y, cellsExportAlways, extraCols: 0 }
  }, [cellsExportAlwaysRecords, xAxisSelection])
}
