import { Objects } from 'utils/objects'

import { Col, ColType, Row } from 'meta/assessment'

import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

import { PropsTranspose, ReturnedTranspose } from './_types'

export const _transposeHeaders = (props: PropsTranspose): Pick<ReturnedTranspose, 'headers' | 'rowsHeader'> => {
  const { cycle, headers: _headers, rowsData, rowsHeader: _rowsHeader, table } = props
  const { uuid: cycleUUID } = cycle

  const headers: Array<ColHeader> = rowsData.map<ColHeader>((row) => ({ columnName: row.props.variableName }))
  const rowsHeader: Array<Row> = []

  _rowsHeader.forEach((_row, rowIndex) => {
    const row = Objects.cloneDeep(_row)

    if (rowIndex === 0) {
      // invert first two columns
      const firstCol = row.cols.at(0)
      const firstColStyle = { ...firstCol.props.style[cycleUUID] }
      const secondCol = row.cols.at(1)
      const secondColStyle = { ...secondCol.props.style[cycleUUID] }
      firstCol.props = {
        ...firstCol.props,
        index: 1,
        style: { [cycleUUID]: { ...secondColStyle, colSpan: headers.length } },
      }
      secondCol.props = {
        ...secondCol.props,
        index: 0,
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
