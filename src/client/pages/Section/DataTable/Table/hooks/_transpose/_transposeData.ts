import { Objects } from 'utils/objects'

import { Col, ColType, Row, RowType } from 'meta/assessment'

import { PropsTranspose, ReturnedTranspose } from './_types'

export const _transposeData = (props: PropsTranspose): Pick<ReturnedTranspose, 'rowsData'> => {
  const { cycle, headers, rowsData: _rowsData, table } = props
  const { uuid: cycleUUID } = cycle
  const { id: tableId } = table

  const rowsData: Array<Row> = []

  headers.forEach((header, index) => {
    const { columnName } = header
    const cycles = [cycleUUID]

    const rowProps: Row['props'] = { cycles, index, type: RowType.data }
    const row: Row = { id: index, props: rowProps, tableId, uuid: `row-uuid-${index}` }

    const labels = { [cycleUUID]: { label: columnName } }
    const colHeaderProps: Col['props'] = { colType: ColType.placeholder, cycles, labels }
    const rowId = row.id
    const colHeader: Col = { id: (index + 1) * rowsData.length, uuid: `col-${index}-0`, props: colHeaderProps, rowId }

    const colsData = _rowsData.map<Col>((rowData) => {
      const col = rowData.cols.find((c) => c.props.colName === columnName)
      const { variableName } = rowData.props
      const colProps = { ...Objects.cloneDeep(col.props), variableName }

      return { id: col.id, uuid: col.uuid, props: colProps, rowId }
    })
    row.cols = [colHeader, ...colsData]

    rowsData.push(row)
  })

  return { rowsData }
}
