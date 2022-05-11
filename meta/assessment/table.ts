import { CycledPropsObject, Row, Unit } from './index'

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
