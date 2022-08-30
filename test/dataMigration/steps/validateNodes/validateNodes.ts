import { NodeRow } from '@test/dataMigration/types'
import { Objects } from '@utils/objects'
import * as pgPromise from 'pg-promise'

import { Assessment, Col, Cycle, Node, Row, TableNames } from '@meta/assessment'

import { CycleDataController } from '@server/controller/cycleData'
import { validateNode } from '@server/controller/cycleData/persistNodeValue/validateNodeUpdates/validateNode'
import { BaseProtocol, Schemas } from '@server/db'
import { CountryRepository } from '@server/repository/assessmentCycle/country'

export const validateNodes = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle } = props
  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(
    [
      'country_iso',
      'row_uuid',
      'col_uuid',
      {
        name: 'value',
        cast: 'jsonb',
      },
    ],
    {
      table: { table: 'node', schema: schemaCycle },
    }
  )

  const nodes = await client.map<Node & { tableName: string; row: Row; col: Col }>(
    `
        select n.*,
               t.props ->> 'name'    as table_name,
               to_jsonb(r.*)         as row,
               to_jsonb(c.*)         as col
        from ${schemaCycle}.node n
                 left join ${schema}.row r
                           on n.row_uuid = r.uuid
                 left join ${schema}.col c
                           on n.col_uuid = c.uuid
                 left join ${schema}."table" t
                           on r.table_id = t.id
        where r.props ->> 'validateFns' is not null
    `,
    [],
    // @ts-ignore
    Objects.camelize
  )

  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)
  const tableNames = await client.map<string>(
    `select distinct t.props->>'name' as name
    from ${schema}."table" t
    where t.props->>'name' is not null`,
    [],
    ({ name }) => name
  )
  tableNames.push(TableNames.valueAggregate)

  const data = await CycleDataController.getTableData({
    assessment,
    cycle,
    tableNames,
    countryISOs,
    variables: undefined,
    columns: undefined,
    mergeOdp: true,
    aggregate: false,
  })

  const values: Array<NodeRow> = []
  const nodeUUIDs: Array<string> = []
  while (nodes.length) {
    const { countryIso, tableName, col, row, value, uuid } = nodes.shift()
    const { variableName } = row.props
    const { colName } = col.props
    nodeUUIDs.push(uuid)
    // eslint-disable-next-line no-await-in-loop
    const validation = await validateNode(
      { countryIso, assessment, cycle, tableName, variableName, colName, row, data },
      client
    )
    values.push({
      country_iso: countryIso,
      row_uuid: row.uuid,
      col_uuid: col.uuid,
      value: { ...value, validation },
    })
  }

  await client.query(
    `delete from ${schemaCycle}.node n
        where n.uuid in (${nodeUUIDs.map((uuid) => `'${uuid}'`).join(',')})`
  )
  await client.query(pgp.helpers.insert(values, cs))
}
