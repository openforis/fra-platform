import { useDeferredValue } from 'react'

import { RecordAssessmentData } from 'meta/data/recordData'
import { Axis, AxisSelection } from 'meta/explorer/selection'

import { useExplorerSectionData } from 'client/store/explorer/data/hooks/data'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import {
  AxisValues,
  CellExportAlways,
  Combination,
  CountryOptionField,
  UniquePrimaryAxis,
} from 'client/pages/Explorer/ResultGrid/types'

import { useAxisValues } from './useAxisValues'
import { useCellsExportAlways } from './useCellsExportAlways'
import { useCombinations } from './useCombinations'
import { useCountryAxis } from './useCountryAxis'
import { useCountryOptionFields } from './useCountryOptionFields'
import { useGridTemplateColumns } from './useGridTemplateColumns'

type Returned = {
  axisValues: AxisValues
  cellsExportAlways: Array<CellExportAlways>
  cellsExportAlwaysAxis: Axis
  countryAxis: Axis | null
  countryOptionFields: Array<CountryOptionField>
  data: RecordAssessmentData
  gridTemplateColumns: string
  uniquePrimaryX: UniquePrimaryAxis
  xAxisSelection: AxisSelection['x']
  xCombinations: Array<Combination>
  yAxisSelection: AxisSelection['y']
  yCombinations: Array<Combination>
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

  const { x: rawXAxisSelection, y: rawYAxisSelection } = useExplorerAxisSelection()
  const xAxisSelection = useDeferredValue(rawXAxisSelection)
  const yAxisSelection = useDeferredValue(rawYAxisSelection)

  const rawCountryAxis = useCountryAxis()
  const rawCountryOptionFields = useCountryOptionFields()
  const countryOptionFields = useDeferredValue(rawCountryOptionFields)
  const countryAxis = useDeferredValue(rawCountryAxis)

  const rawGridTemplateColumns = useGridTemplateColumns({
    axisValues,
    countryAxis,
    countryOptionFieldsCount: countryOptionFields.length,
    extraCols,
  })

  const gridTemplateColumns = useDeferredValue(rawGridTemplateColumns)

  return {
    axisValues,
    cellsExportAlways,
    cellsExportAlwaysAxis,
    countryAxis,
    countryOptionFields,
    data,
    gridTemplateColumns,
    uniquePrimaryX,
    xAxisSelection,
    xCombinations,
    yAxisSelection,
    yCombinations,
  }
}
