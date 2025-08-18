import * as pgPromise from 'pg-promise'
import { Arrays } from 'utils/arrays'
import { Objects } from 'utils/objects'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Col, ColName } from 'meta/assessment/col'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { TableNames } from 'meta/assessment/table'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { TableRedisRepository } from 'server/repository/redis/table'

const assessmentName = AssessmentNames.fra
const cycleName = 'latest'
const tableName = TableNames.nonWoodForestProductsRemovals
// match header label with translation key, no colName available
const columnHeaderLabel = 'nonWoodForestProductsRemovals.value'
const colName = 'value'
// product_1, ... , product_10
const variableNames = Arrays.range(1, 11).map((i) => `product_${i}`)

type BaseProps = {
  assessment: Assessment
  cycle: Cycle
}

type UpdateColProps = BaseProps & { col: Col }
type UpdateRowProps = BaseProps & { rows: Array<Row> }

const getSortableBy = (props: { cycle: Cycle }): Record<CycleUuid, Array<ColName>> => {
  const { cycle } = props
  return { [cycle.uuid]: [colName] }
}

const _getSortableProperty = (props: { cycle: Cycle }): Record<CycleUuid, ColName> => {
  const { cycle } = props
  return { [cycle.uuid]: colName }
}

const _updateCol = async (props: UpdateColProps, client: BaseProtocol): Promise<void> => {
  const { assessment, col, cycle } = props

  const pgp = pgPromise()
  const schemaAssessment = Schemas.getName(assessment)
  const columns = ['?id', { cast: 'jsonb', name: 'props' }]
  const options = { table: { table: 'col', schema: schemaAssessment } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  Objects.setInPath({ obj: col, path: ['props', 'sortable'], value: _getSortableProperty({ cycle }) })
  const updates: Array<Col> = [col]

  const query = `${pgp.helpers.update(updates, cs)} WHERE v.id = t.id`
  await client.query(query)
}

const _updateRows = async (props: UpdateRowProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle, rows } = props

  const pgp = pgPromise()
  const schemaAssessment = Schemas.getName(assessment)
  const columns = ['?id', { cast: 'jsonb', name: 'props' }]
  const options = { table: { table: 'row', schema: schemaAssessment } }
  const cs = new pgp.helpers.ColumnSet(columns, options)
  const updates: Array<Col> = rows.map((row) =>
    Objects.setInPath({ obj: row, path: ['props', 'sortableBy'], value: getSortableBy({ cycle }) })
  )

  const query = `${pgp.helpers.update(updates, cs)} WHERE v.id = t.id`
  await client.query(query)
}

export default async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const table = await TableRedisRepository.getOne({ assessment, cycle, tableName })

  const rowHeader = table.rows.at(0)
  const rows = table.rows.filter((r) => variableNames.includes(r.props.variableName))
  const col = rowHeader.cols.find((col) => col.props?.labels?.[cycle.uuid]?.key === columnHeaderLabel)

  await _updateCol({ assessment, cycle, col }, client)
  await _updateRows({ assessment, cycle, rows }, client)

  await AssessmentController.generateMetadataCache({ assessment })
}
