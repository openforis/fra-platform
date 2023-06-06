import { Row, Section, Table, TableSection } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const section = await client.one<Section>(
    `select * from ${schemaName}.section where props->>'name' = 'forestAreaChange';`
  )

  const tableSection = await client.one<TableSection>(
    `select * from ${schemaName}.table_section where section_id = $1;`,
    [section.id]
  )

  const table = await client.one<Table>(`select * from ${schemaName}.table where table_section_id = $1;`, [
    tableSection.id,
  ])

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{index}', '7') where r.props->>'index' = '6' and table_id = $1;`,
    [table.id]
  )

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{index}', '6') where r.props->>'index' = '5' and table_id = $1;`,
    [table.id]
  )

  const newRow = `{
    "type": "data",
    "index": 5,
    "label": {"key": "forestAreaChange.forestAreaNetChangeFrom1a"},
    "cycles": ["${cycle.uuid}"],
    "variableName": "forestAreaNetChangeFrom1a",
    "linkToSection": "extentOfForest"
  }`

  const row = await client.one<Row>(
    `insert into ${schemaName}.row (table_id, props) values ($1, $2::jsonb) returning *;`,
    [table.id, newRow]
  )

  const colHeader0 = `{
    "index": "header_0",
    "style": {"${cycle.uuid}": {"colSpan": 1}},
    "cycles": ["${cycle.uuid}"],
    "labels": {"${cycle.uuid}": {"key": "forestAreaChange.forestAreaNetChangeFrom1a"}},
    "colType": "header"
  }`

  const col0 = `{
    "index": 0,
    "style": {"${cycle.uuid}": {}},
    "cycles": ["${cycle.uuid}"],
    "colName": "1990-2000",
    "colType": "calculated",
    "calculateFn": {"${cycle.uuid}": "(extentOfForest.forestArea['2000'] - extentOfForest.forestArea['1990']) / 10"}
  }`

  const col1 = `{
    "index": 1,
    "style": {"${cycle.uuid}": {}},
    "cycles": ["${cycle.uuid}"],
    "colName": "2000-2010",
    "colType": "calculated",
    "calculateFn": {"${cycle.uuid}": "(extentOfForest.forestArea['2010'] - extentOfForest.forestArea['2000']) / 10"}
  }`

  const col2 = `{
    "index": 2,
    "style": {"${cycle.uuid}": {}},
    "cycles": ["${cycle.uuid}"],
    "colName": "2010-2015",
    "colType": "calculated",
    "calculateFn": {"${cycle.uuid}": "(extentOfForest.forestArea['2015'] - extentOfForest.forestArea['2010']) / 5"}
  }`

  const col3 = `{
    "index": 3,
    "style": {"${cycle.uuid}": {}},
    "cycles": ["${cycle.uuid}"],
    "colName": "2015-2020",
    "colType": "calculated",
    "calculateFn": {"${cycle.uuid}": "(extentOfForest.forestArea['2020'] - extentOfForest.forestArea['2015']) / 5"}
  }`

  const col4 = `{
    "index": 4,
    "style": {"${cycle.uuid}": {}},
    "cycles": ["${cycle.uuid}"],
    "colName": "2020-2025",
    "colType": "calculated",
    "calculateFn": {"${cycle.uuid}": "(extentOfForest.forestArea['2025'] - extentOfForest.forestArea['2020']) / 5"}
  }`

  await client.query(`insert into ${schemaName}.col (row_id, props) values ($1, $2::jsonb);`, [row.id, colHeader0])
  await client.query(`insert into ${schemaName}.col (row_id, props) values ($1, $2::jsonb);`, [row.id, col0])
  await client.query(`insert into ${schemaName}.col (row_id, props) values ($1, $2::jsonb);`, [row.id, col1])
  await client.query(`insert into ${schemaName}.col (row_id, props) values ($1, $2::jsonb);`, [row.id, col2])
  await client.query(`insert into ${schemaName}.col (row_id, props) values ($1, $2::jsonb);`, [row.id, col3])
  await client.query(`insert into ${schemaName}.col (row_id, props) values ($1, $2::jsonb);`, [row.id, col4])

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )
}
