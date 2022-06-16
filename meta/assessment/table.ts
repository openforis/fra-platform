import { CycledPropsObject, Row, Unit } from './index'

// utility table names
// e.g. used in getTableData to merge data with odp or fetch correct data for dashboard
export enum TableNames {
  carbonStock = 'carbonStock',
  extentOfForest = 'extentOfForest',
  forestAreaWithinProtectedAreas = 'forestAreaWithinProtectedAreas',
  forestCharacteristics = 'forestCharacteristics',
  forestOwnership = 'forestOwnership',
  growingStockTotal = 'growingStockTotal',
  specificForestCategories = 'specificForestCategories',
  totalAreaWithDesignatedManagementObjective = 'totalAreaWithDesignatedManagementObjective',
  primaryDesignatedManagementObjective = 'primaryDesignatedManagementObjective',

  valueAggregate = 'value_aggregate',
}

// array of column names indexed by cycle uuid
export type TableColumnNames = Record<string, Array<string>>

export interface TableProps {
  name: string
  odp?: boolean
  secondary?: boolean
  unit?: Unit
  columnNames: TableColumnNames
  // print
  print?: { pageBreakAfter: boolean }
  // data export
  dataExport: boolean
  columnsExport?: TableColumnNames
  columnsExportAlways?: TableColumnNames
}

export interface Table extends CycledPropsObject<TableProps> {
  rows?: Array<Row>
  tableSectionId: number
  // odpVariables?: Record<string, string>
}
