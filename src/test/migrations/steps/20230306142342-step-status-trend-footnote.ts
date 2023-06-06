import { Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const _getMaxRowIndex = (tableName: string, client: BaseProtocol) =>
  client.one(
    `
  select max(r.props ->> 'index')::numeric as max
  from assessment_fra.row r
  where
  r.table_id = (select id from assessment_fra.table where props ->> 'name' = $<tableName>)
  and r.props ->> 'index' ~ '^[0-9]+$'
`,
    { tableName }
  )

const _insertRow = (schemaName: string, cycle: Cycle, tableName: string, maxRowIndex: number, client: BaseProtocol) =>
  client.one(`
  insert into ${schemaName}.row (props, table_id)
  values ('{"type": "noticeMessage", "index": ${maxRowIndex}, "cycles": ["${cycle.uuid}"]}'::jsonb, (select id from ${schemaName}.table where props ->> 'name' = '${tableName}'))
  returning *;`)

const _insertCol = (schemaName: string, cycle: Cycle, tableName: string, rowId: number, label: string, client: BaseProtocol) =>
  client.query(`
  insert into ${schemaName}.col (props, row_id)
  values ('{"index": 0, "style": {"${cycle.uuid}": {"colSpan": 2, "rowSpan": 1}}, "cycles": ["${cycle.uuid}"], "labels": {"${cycle.uuid}": {"key": "fra.${tableName}.${label}"}}, "colType": "noticeMessage"}'::jsonb,
    ${rowId}::bigint) returning *;`)

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName: 'fra', cycleName: '2025' }, client)

  const schemaName = Schemas.getName(assessment)

  // 1a

  const tableName1 = 'extentOfForest_forestAreaStatusAndTrend_Description'
  const { max: maxRowIndex } = await _getMaxRowIndex(tableName1, client)

  const insertedRow1 = await _insertRow(schemaName, cycle, tableName1, maxRowIndex, client)
  await _insertCol(schemaName, cycle, tableName1, insertedRow1.id, 'footer1', client)

  const insertedRow2 = await _insertRow(schemaName, cycle, tableName1, maxRowIndex, client)
  await _insertCol(schemaName, cycle, tableName1, insertedRow2.id, 'footer2', client)

  const insertedRow3 = await _insertRow(schemaName, cycle, tableName1, maxRowIndex, client)
  await _insertCol(schemaName, cycle, tableName1, insertedRow3.id, 'footer3', client)

  // 2a

  const tableName2 = 'growingStock_growingStockStatus_Description'
  const { max: maxRowIndexGS } = await _getMaxRowIndex(tableName2, client)

  const insertedRow4 = await _insertRow(schemaName, cycle, tableName2, maxRowIndexGS, client)
  await _insertCol(schemaName, cycle, tableName2, insertedRow4.id, 'footer1', client)

  const insertedRow5 = await _insertRow(schemaName, cycle, tableName2, maxRowIndexGS, client)
  await _insertCol(schemaName, cycle, tableName2, insertedRow5.id, 'footer2', client)
}
