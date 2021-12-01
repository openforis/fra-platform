import { CycledPropsObject } from '@core/meta/assessment/cycle'
import { Row } from '@core/meta/assessment/row'
import { Unit } from '@core/meta/assessment/unit'

export interface TableProps {
  name: string
  odp?: boolean
  unit?: Unit
}

export interface Table extends CycledPropsObject<TableProps> {
  // base props
  rows?: Array<Row>
  tableSectionId: number
  // odpVariables?: Record<string, string>
  // secondary?: boolean // TODO check how to use it
  // showOdpChart?: boolean
  // tableDataRequired?: Array<TableSummarySpec>
  // print props
  // print?: { pageBreakAfter: boolean; colBreakPoints?: Array<number> }
  // data export
  // dataExport: boolean // TODO: check in the code which dataExport is used. TableSpec or SectionDef
  // columnsExport?: Array<string | number>
  // columnsExportAlways: Array<string>
  // Functions
  // getSectionData: GetSectionData
  // isSectionDataEmpty: GetSectionData
  // canGenerateValues?: (state: any) => boolean
  // updateTableDataCell: UpdateTableData
}
