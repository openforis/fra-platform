import { GetSectionData, TableSpec, TableSummarySpec, UpdateTableData } from '../sectionSpec/tableSpec'
import { RowSpec } from '../sectionSpec/rowSpec'
import { Unit } from '../sectionSpec/unitSpec'

import * as AssessmentState from '../app/assessment/assessmentState'
import { updateTableDataCell } from '../components/Assessment/DataTable/actions'
import { TypeSpec } from '../sectionSpec/typeSpec'

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
  print?: { pageBreakAfter: boolean; colBreakPoints?: Array<number> }
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
