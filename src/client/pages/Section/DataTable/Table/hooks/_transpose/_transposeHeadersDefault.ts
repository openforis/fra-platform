import { Objects } from 'utils/objects'

import { Col, ColType, Row } from 'meta/assessment'
import { Labels } from 'meta/assessment/labels'

import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

import { PropsTranspose, ReturnedTranspose, TransposeHeaders } from './_types'

export const _getTransposedHeaders = (rowsData: PropsTranspose['rowsData']): ReturnedTranspose['headers'] =>
  rowsData.map<ColHeader>((row) => ({ columnName: row.props.variableName }))

export const transposeHeadersDefault: TransposeHeaders = (props) => {
  const { cycle, headers: _headers, rowsData, rowsHeader: _rowsHeader, table, t } = props
  const { uuid: cycleUUID } = cycle

  const headers = _getTransposedHeaders(rowsData)
  const rowsHeader: Array<Row> = []

  _rowsHeader.forEach((_row, rowIndex) => {
    const row = Objects.cloneDeep(_row)

    if (rowIndex === 0) {
      // invert first two columns
      const firstCol = row.cols.at(0)
      const firstColStyle = { ...firstCol.props.style[cycleUUID] }
      const secondCol = row.cols.at(1)
      const secondColStyle = { ...secondCol.props.style[cycleUUID] }
      const firstColLabel = Labels.getCycleLabel({ cycle, labels: firstCol.props.labels, t })
      const secondColLabel = Labels.getCycleLabel({ cycle, labels: secondCol.props.labels, t })
      firstCol.props = {
        ...firstCol.props,
        index: 1,
        labels: { [cycleUUID]: { label: `${firstColLabel} ${secondColLabel.toLowerCase()}` } },
        style: { [cycleUUID]: { ...secondColStyle, colSpan: headers.length } },
      }
      secondCol.props = {
        ...secondCol.props,
        index: 0,
        labels: { [cycleUUID]: { label: '' } },
        style: { [cycleUUID]: { ...firstColStyle } },
      }
      row.cols = [secondCol, firstCol]
      rowsHeader.push(row)
    } else if (row.cols.length === _headers.length) {
      // move rows data to row header cols
      row.cols = rowsData.map<Col>((row) => {
        const colHeader = row.cols.at(0)
        return { ...colHeader, props: { ...colHeader.props, colType: ColType.header } }
      })
      rowsHeader.push(row)
    } else {
      throw new Error(`Unsupported table ${table.props.name} in cycle ${cycle.name}. Implement it if needed`)
    }
  })

  return { headers, rowsHeader }
}
