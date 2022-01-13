import { ITask } from 'pg-promise'

import { Col, ColType, Row, RowType, Table } from '../../../meta/assessment'
import { Objects } from '../../../core/utils'

export const getRows = (client: ITask<any>, schema: string, table: Table): Promise<Array<Row>> =>
  client.map<Row>(
    `select *
     from ${schema}.row
     where table_id = $1
       and props ->> 'type' = '${RowType.data}';`,
    [table.id],
    // @ts-ignore
    Objects.camelize
  )

export const getCols = (client: ITask<any>, schema: string, table: Table): Promise<Array<Col>> =>
  client.map<Col>(
    `select *
     from assessment_fra.col c
     where c.row_id in (
         select r.id
         from ${schema}.row r
         where table_id = $1
     )
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.calculated}', '${ColType.noticeMessage}')`,
    [table.id],
    // @ts-ignore
    Objects.camelize
  )

export const getColIndexes = (rowsData: Row[], cols: Array<Col>): Array<number> => {
  const maxCols = rowsData.reduce<number>((max, row) => {
    const colsRow = cols.filter((col) => col.rowId === row.id && col.props.index >= 0)
    return colsRow.reduce<number>((m, col) => (Number(col.props.index) > m ? Number(col.props.index) : m), max)
  }, 0)
  return Array.from(Array(maxCols + 1).keys())
}
