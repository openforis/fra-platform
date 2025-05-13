// utility table names
// e.g. used in getTableData to merge data with odp or fetch correct data for dashboard
import { CSSProperties } from 'react'

import { ColName } from 'meta/assessment/col'
import { CycleUuid } from 'meta/assessment/cycle'
import { CycledPropsObject } from 'meta/assessment/cycledObject'
import { VariableCache } from 'meta/assessment/metaCache'
import { Row } from 'meta/assessment/row'
import { UnitName } from 'meta/assessment/unit'
import { VariableName } from 'meta/assessment/variable'

export enum TableNames {
  areaAffectedByFire = 'areaAffectedByFire',
  biomassStockAvg = 'biomassStockAvg',
  biomassStockTotal = 'biomassStockTotal',
  biomassStock_biomassStockStatus = 'biomassStock_biomassStockStatus',
  carbonStock = 'carbonStock',
  carbonStockAvg = 'carbonStockAvg',
  carbonStockSoilDepth = 'carbonStockSoilDepth',
  carbonStockTotal = 'carbonStockTotal',
  climaticDomain = 'climaticDomain',
  disturbances = 'disturbances',
  extentOfForest = 'extentOfForest',
  extentOfForest_forestAreaStatusAndTrend = 'extentOfForest_forestAreaStatusAndTrend',
  forestAreaWithinProtectedAreas = 'forestAreaWithinProtectedAreas',
  forestCharacteristics = 'forestCharacteristics',
  forestOwnership = 'forestOwnership',
  growingStockAvg = 'growingStockAvg',
  growingStockTotal = 'growingStockTotal',
  growingStock_growingStockStatus = 'growingStock_growingStockStatus',
  primaryDesignatedManagementObjective = 'primaryDesignatedManagementObjective',
  specificForestCategories = 'specificForestCategories',
  sustainableDevelopment15_2_1_1 = 'sustainableDevelopment15_2_1_1',
  sustainableDevelopment15_2_1_2 = 'sustainableDevelopment15_2_1_2',
  sustainableDevelopment15_2_1_5 = 'sustainableDevelopment15_2_1_5',
  totalAreaWithDesignatedManagementObjective = 'totalAreaWithDesignatedManagementObjective',
  // Used to append ODP data to tableData
  originalDataPointValue = 'originalDataPointValue',
}

export enum TableCellNumberFormat {
  decimal = 'decimal',
  integer = 'integer',
  original = 'original',
}

export type TableCell = {
  columnName: ColName
  variableName: VariableName
  format?: TableCellNumberFormat
  unit?: UnitName | null
}
export type TableCellNames = Record<CycleUuid, Array<TableCell>>
// array of column names indexed by cycle uuid
export type TableColumnNames = Record<CycleUuid, Array<ColName>>
export type TableName = string

export interface TableProps {
  cellsExportAlways?: TableCellNames
  columnNames: TableColumnNames
  columnsExport?: TableColumnNames
  columnsExportAlways?: TableColumnNames
  dataExport: boolean
  disableErrorMessage?: Record<CycleUuid, boolean>
  name: TableName
  odp?: boolean
  readonly?: boolean
  report?: Record<CycleUuid, { columnsReport?: Array<ColName>; transpose?: boolean }>
  secondary?: boolean
  style?: Record<CycleUuid, Pick<CSSProperties, 'gridTemplateColumns'>>
  unit?: UnitName
}

export interface Table extends CycledPropsObject<TableProps> {
  calculationDependencies?: Record<VariableName, Array<VariableCache>>
  rows?: Array<Row>
  tableSectionId: number
  validationDependencies?: Record<VariableName, Array<VariableCache>>
  // odpVariables?: Record<string, string>
}
