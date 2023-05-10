import { CycledPropsObject, Row, Unit, VariableCache } from './index'

// utility table names
// e.g. used in getTableData to merge data with odp or fetch correct data for dashboard
export enum TableNames {
  carbonStock = 'carbonStock',
  carbonStockAvg = 'carbonStockAvg',
  extentOfForest = 'extentOfForest',
  forestAreaWithinProtectedAreas = 'forestAreaWithinProtectedAreas',
  forestCharacteristics = 'forestCharacteristics',
  forestOwnership = 'forestOwnership',
  growingStockTotal = 'growingStockTotal',
  'growingStockAvg' = 'growingStockAvg',
  // Used to append ODP data to tableData
  originalDataPointValue = 'originalDataPointValue',
  primaryDesignatedManagementObjective = 'primaryDesignatedManagementObjective',
  specificForestCategories = 'specificForestCategories',
  totalAreaWithDesignatedManagementObjective = 'totalAreaWithDesignatedManagementObjective',
  // Used for dashboard
  valueAggregate = 'value_aggregate',
}

// array of column names indexed by cycle uuid
export type TableColumnNames = Record<string, Array<string>>

export type TableName = string

export interface TableProps {
  columnNames: TableColumnNames
  columnsExport?: TableColumnNames
  columnsExportAlways?: TableColumnNames
  dataExport: boolean
  name: TableName
  odp?: boolean
  print?: { pageBreakAfter: boolean }
  readonly?: boolean
  secondary?: boolean
  unit?: Unit
}

export interface Table extends CycledPropsObject<TableProps> {
  rows?: Array<Row>
  tableSectionId: number
  validationDependencies?: Record<string, Array<VariableCache>>
  calculationDependencies?: Record<string, Array<VariableCache>>
  // odpVariables?: Record<string, string>
}
