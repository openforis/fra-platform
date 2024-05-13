import { Assessment, ColProps, Cycle, Row, Table, TableProps } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { ColRepository } from 'server/repository/assessment/col'
import { TableRepository } from 'server/repository/assessment/table'

type Props = {
  assessment: Assessment
  cycles: Array<Cycle>
  table: Table
  colProps: ColProps
}

export const addColumn = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycles, table, colProps } = props

  // split rows
  const rows = table.rows?.reduce<[Array<Row>, Array<Row>]>(
    (acc, row) => {
      if (row.cols?.length === 2) acc[0].push(row) // header
      if (row.cols?.length > 2) acc[1].push(row) // data
      return acc
    },
    [[], []]
  )

  // insert cols
  const colLengths = await Promise.all(
    rows[1].map<Promise<number>>(async (row) => {
      await ColRepository.create({ assessment, cycles, row, colProps }, client)
      return row.cols.length + 1
    })
  )

  // update col header colSpan
  await Promise.all(
    rows[0].map(async (row) => {
      const col = row.cols.at(-1)
      const style = cycles.reduce<ColProps['style']>((acc, cycle) => {
        const colSpan = Math.max(...colLengths) - 1
        return { ...acc, [cycle.uuid]: { ...acc[cycle.uuid], colSpan } }
      }, col.props.style ?? {})

      await ColRepository.update({ assessment, colId: col.id, colProps: { style } }, client)
    })
  )

  // update table props column names
  const columnsExport = cycles.reduce<TableProps['columnsExport']>((acc, cycle) => {
    return { ...acc, [cycle.uuid]: [...(table.props.columnsExport?.[cycle.uuid] ?? []), colProps.colName] }
  }, table.props.columnsExport ?? {})
  const columnNames = cycles.reduce<TableProps['columnNames']>((acc, cycle) => {
    return { ...acc, [cycle.uuid]: [...(table.props.columnNames?.[cycle.uuid] ?? []), colProps.colName] }
  }, table.props.columnNames ?? {})

  await TableRepository.update({ assessment, tableId: table.id, tableProps: { columnsExport, columnNames } }, client)
}
