import { ITask } from 'pg-promise'

import { Col, ColType, Row, RowType, Table } from '../../meta/assessment'
import { Objects } from '../../core/utils/objects'

import { getMapping } from './dataTable/tableMappings'
import * as sqlCreator from './dataTable/dataTableSqlCreator'

interface Data extends Record<string, string> {
  countryIso: string
  rowName: string
}

const getRows = (client: ITask<any>, schema: string, table: Table): Promise<Array<Row>> =>
  client.map<Row>(
    `select *
                 from ${schema}.row
                 where table_id = $1
                   and props ->> 'type' = '${RowType.data}';`,
    [table.id],
    // @ts-ignore
    Objects.camelize
  )

const getCols = (client: ITask<any>, schema: string, table: Table): Promise<Array<Col>> =>
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

export const migrateData = async (props: {
  client: ITask<any>
  schema: string
  schemaCycle: string
  table: Table
}): Promise<void> => {
  const { client, schema, schemaCycle, table } = props
  const mapping = getMapping(table.props.name)
  const rows = await getRows(client, schema, table)
  const cols = await getCols(client, schema, table)

  // const countryIso = 'ALB'
  const countryISOs = ['ALB', 'DZA']
  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const queries: Array<Promise<any>> = []
      const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, table.props.name, '_legacy')
      let data = Objects.camelize(await client.manyOrNone<Data>(selectQuery, selectParams)) as Array<Data>
      if (data.length === 0) data = []
      console.log('====== data ', data)

      mapping.rows.names.forEach((rowName, index) => {
        const row = rows.find((r) => r.props.index === index)
        // console.log(row)
        mapping.columns.forEach((columnMapping, index) => {
          const col: Col = cols.find((c) => c.rowId === row.id && c.props.index === index)
          const dataRow = data.find((d) => d.rowName === rowName)
          const datum = dataRow[columnMapping.name]
          // console.log(col)
          queries.push(
            client.query(
              `insert into ${schemaCycle}.node (country_iso, row_uuid, col_uuid, value)
                    values ($1, $2, $3, $4::jsonb)`,
              [countryIso, row.uuid, col.uuid, { raw: datum ? String(datum) : null }]
            )
          )
        })
      })

      await client.batch(queries)
    })
  )
}
