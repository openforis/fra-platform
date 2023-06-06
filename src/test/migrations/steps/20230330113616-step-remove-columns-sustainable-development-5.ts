import { Row, Table } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName: 'fra', cycleName: '2025' }, client)

  const schemaName = Schemas.getName(assessment)

  const table = await client.one<Table>(`select * from ${schemaName}.table where props->>'name' = $1;`, ['sustainableDevelopment15_2_1_5'])

  const columns = ['2000', '2005', '2010', '2011', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']

  await client.query(
    `update ${schemaName}.table t set props = jsonb_set(t.props, '{columnNames,${cycle.uuid}}', $1::jsonb) where id = $2;`,
    [JSON.stringify(columns), table.id]
  )

  await client.query(
    `update ${schemaName}.table t set props = jsonb_set(t.props, '{columnsExport,${cycle.uuid}}', $1::jsonb) where id = $2;`,
    [JSON.stringify(columns), table.id]
  )

  const rowHeader0 = await client.one<Row>(
    `select * from ${schemaName}.row r where r.props->>'index' = 'header_0' and table_id = $1;`,
    table.id
  )

  await client.query(
    `update ${schemaName}.col c set props = jsonb_set(c.props, '{style,${cycle.uuid},colSpan}', '14') where c.props->>'index' = '1' and row_id = $1;`,
    rowHeader0.id
  )

  const rowHeader1 = await client.one<Row>(`select * from ${schemaName}.row r where r.props->>'index' = 'header_1' and table_id = $1;`, [
    table.id,
  ])

  await client.query(
    `delete from ${schemaName}.col c where c.props->>'index' in ('1', '2', '3', '4', '6', '7', '8', '9', '11', '12', '13', '14') and row_id = $1;`,
    rowHeader1.id
  )

  const rowData = await client.one<Row>(`select * from ${schemaName}.row r where r.props->>'type' = 'data' and table_id = $1;`, table.id)

  await client.query(
    `delete from ${schemaName}.col c where c.props->>'colName' in ('2001', '2002', '2003', '2004', '2006', '2007', '2008', '2009', '2011', '2012', '2013', '2014') and row_id = $1;`,
    rowData.id
  )
}
