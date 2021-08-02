import { GetSectionData, TableSpec, TableSummarySpec, UpdateTableData } from '@webapp/sectionSpec/tableSpec'
import { RowSpec } from '@webapp/sectionSpec/rowSpec'
import { Unit } from '@webapp/sectionSpec/unitSpec'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { updateTableDataCell } from '@webapp/app/assessment/components/dataTable/actions'
import { TypeSpec } from '@webapp/sectionSpec/typeSpec'

interface TableSpecProps {
  name?: string
  rows?: Array<RowSpec> // TODO
  odp?: boolean
  odpVariables?: Record<string, string>
  secondary?: boolean
  showOdpChart?: boolean
  tableDataRequired?: Array<TableSummarySpec>
  unit?: Unit
  // print props
  print?: { pageBreakAfter: boolean; colBreakPoints?: Array<string> }
  // data export
  dataExport?: boolean
  columnsExport?: Array<string | number>
  columnsExportAlways?: Array<string>
  // Functions
  getSectionData?: GetSectionData
  isSectionDataEmpty?: GetSectionData
  canGenerateValues?: (state: any) => boolean
  updateTableDataCell?: UpdateTableData
}

const tableDefault: TableSpec = {
  name: '',
  rows: [],
  // secondary: false,
  tableDataRequired: [],
  // unit: null,
  print: { colBreakPoints: [], pageBreakAfter: false },
  getSectionData: AssessmentState.getSectionData,
  isSectionDataEmpty: AssessmentState.isSectionDataEmpty,
  // odp: false,
  // odpVariables: {},
  // showOdpChart: false,
  // canGenerateValues: null,
  updateTableDataCell,
  dataExport: true,
  // columnsExport: null,
  columnsExportAlways: [],
}

const newInstance = (props: TableSpecProps): TableSpec => {
  const tableSpec: TableSpec = { ...tableDefault, ...props }

  let idxHeader = -1
  let idxData = -1
  tableSpec.rows = tableSpec.rows.map((rowSpec) => {
    const header = rowSpec.type === TypeSpec.header
    idxHeader += header ? 1 : 0
    idxData += header ? 0 : 1

    return {
      idx: header ? `header_${idxHeader}` : idxData,
      ...rowSpec,
    }
  })
  return tableSpec
}

export const TableSpecFactory = {
  newInstance,
}
