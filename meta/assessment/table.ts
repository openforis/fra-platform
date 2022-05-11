import { CycledPropsObject, Row, Unit } from './index'

// utility table names
// e.g. used in getTableData to merge data with odp
export enum TableNames {
  extentOfForest = 'extentOfForest',
  forestCharacteristics = 'forestCharacteristics',
}

export interface TableProps {
  name: string
  odp?: boolean
  secondary?: boolean
  unit?: Unit
  columnNames: Array<string>
  // print
  print?: { pageBreakAfter: boolean }
  // data export
  dataExport: boolean
  columnsExport?: Array<string | number>
  columnsExportAlways?: Array<string>
}

export interface Table extends CycledPropsObject<TableProps> {
  rows?: Array<Row>
  tableSectionId: number
  // odpVariables?: Record<string, string>
}
