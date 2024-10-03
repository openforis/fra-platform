import { VariableCache } from 'meta/assessment/assessmentMetaCache'
import { ColName } from 'meta/assessment/col'
import { CycledPropsObject, CycleUuid } from 'meta/assessment/cycle'
import { Row, VariableName } from 'meta/assessment/row'
import { Unit } from 'meta/assessment/unit'

// utility table names
// e.g. used in getTableData to merge data with odp or fetch correct data for dashboard
export enum TableNames {
  biomassStockAvg = 'biomassStockAvg',
  biomassStockTotal = 'biomassStockTotal',
  carbonStock = 'carbonStock',
  carbonStockAvg = 'carbonStockAvg',
  carbonStockTotal = 'carbonStockTotal',
  climaticDomain = 'climaticDomain',
  extentOfForest = 'extentOfForest',
  forestAreaWithinProtectedAreas = 'forestAreaWithinProtectedAreas',
  forestCharacteristics = 'forestCharacteristics',
  forestOwnership = 'forestOwnership',
  growingStockAvg = 'growingStockAvg',
  growingStockTotal = 'growingStockTotal',
  primaryDesignatedManagementObjective = 'primaryDesignatedManagementObjective',
  specificForestCategories = 'specificForestCategories',
  sustainableDevelopment15_2_1_5 = 'sustainableDevelopment15_2_1_5',
  totalAreaWithDesignatedManagementObjective = 'totalAreaWithDesignatedManagementObjective',
  // Used to append ODP data to tableData
  originalDataPointValue = 'originalDataPointValue',
}

export enum TableCellNumberFormat {
  decimal = 'decimal',
  integer = 'integer',
  year = 'year',
}

export type TableCell = {
  columnName: ColName
  variableName: VariableName
  format?: TableCellNumberFormat
  unit?: Unit | null
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
  print?: { pageBreakAfter: boolean }
  readonly?: boolean
  secondary?: boolean
  unit?: Unit
}

export interface Table extends CycledPropsObject<TableProps> {
  calculationDependencies?: Record<VariableName, Array<VariableCache>>
  rows?: Array<Row>
  tableSectionId: number
  validationDependencies?: Record<VariableName, Array<VariableCache>>
  // odpVariables?: Record<string, string>
}
