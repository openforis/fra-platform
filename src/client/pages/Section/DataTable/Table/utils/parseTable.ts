import { Arrays } from 'utils/arrays'
import { UUIDs } from 'utils/uuids'

import { CountryIso } from 'meta/area'
import { AssessmentName, Col as TypeCol, Cycle, Row as TypeRow, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycle: Cycle
  data: RecordAssessmentData
  showODP: boolean
  table: Table
}

const getHeaders = (props: Props): string[] => {
  const { assessmentName, countryIso, cycle, data, showODP, table } = props

  const headers = table.props.columnNames[cycle.uuid]
  if (table.props.odp && showODP) {
    const headersDiff = RecordAssessmentDatas.getCycleData({ data, assessmentName, cycleName: cycle.name })
      ? Arrays.difference(
          Object.keys(
            RecordAssessmentDatas.getTableData({
              data,
              assessmentName,
              cycleName: cycle.name,
              tableName: table.props.name,
              countryIso,
            })
          ),
          headers
        )
      : []
    return [...headersDiff, ...headers].sort((a, b) => a.localeCompare(b))
  }
  return headers.map((header) => {
    // Case ex. 1990_2000 => 1990-2000
    if (/^\d{4}_\d{4}$/.test(header)) return header.replace('_', '-')
    return header
  })
}

export const parseTable = (props: Props): { headers: Array<string>; table: Table } => {
  const { cycle, table } = props
  const headers = getHeaders(props)

  if (!table.props.odp) {
    return { headers, table }
  }

  // Returns true if we are on header row that contains colNames (eg. '1990' or '% of forest area 2015')
  const isHeaderData = (row: TypeRow): boolean =>
    row.props.type === RowType.header && headers && headers.length > 0 && headers.includes(row.cols[0].props.colName)

  const rows = table.rows.map((row) => {
    let cols = row.cols.map((c) => c)
    const headerData = isHeaderData(row)

    if (headerData || row.props.type === RowType.data) {
      cols = headers.map<TypeCol>((columnHeader) => {
        let col = row.cols.find((c) => c.props.colName === columnHeader)
        if (!col) {
          col = { ...row.cols[1], uuid: UUIDs.v4(), props: { ...row.cols[1].props, colName: columnHeader } }
        }
        return col
      })
      if (!headerData) {
        cols = [{ ...row.cols[0], uuid: UUIDs.v4() }, ...cols]
      }
    }

    if (row.props.type === RowType.header && !headerData) {
      cols = row.cols.map((col) => {
        const style = col.props.style[cycle.uuid]
        if (style.colSpan > 1) {
          return { ...col, uuid: UUIDs.v4(), props: { ...col.props, colSpan: headers.length } }
        }
        return col
      })
    }

    return { ...row, cols }
  })

  return { headers, table: { ...table, rows } }
}
