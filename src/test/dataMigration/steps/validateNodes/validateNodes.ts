import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Assessment, Col, Cycle, Node, Row, TableNames } from 'meta/assessment'

import { CycleDataController } from 'server/controller/cycleData'
import { validateNode } from 'server/controller/cycleData/updateDependencies/updateValidationDependencies/validateNode'
import { BaseProtocol, Schemas } from 'server/db'
import { ColAdapter } from 'server/repository/adapter'
import { CountryRepository } from 'server/repository/assessmentCycle/country'

import { NodeRow } from 'test/dataMigration/types'

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
               t.props ->> 'name' as table_name,
               to_jsonb(r.*)      as row,
               to_jsonb(c.*)      as col
        from ${schemaCycle}.node n
                 left join ${schema}.row r
                           on n.row_uuid = r.uuid
                 left join ${schema}.col c
                           on n.col_uuid = c.uuid
                 left join ${schema}."table" t
                           on r.table_id = t.id
        where t.props -> 'cycles' ? '${cycle.uuid}'
          and r.props -> 'cycles' ? '${cycle.uuid}'
          and ((c.props ->> 'validateFns' is not null and c.props -> 'validateFns' ->> '${cycle.uuid}' is not null) or (r.props ->> 'validateFns' is not null and r.props -> 'validateFns' ->> '${cycle.uuid}' is not null))
          and c.props -> 'cycles' ? '${cycle.uuid}'
    `,
    [],
    // @ts-ignore
    ({ row, col, ...rest }) => {
      return {
        ...Objects.camelize(rest),
        col: ColAdapter(col),
        row: {
          ...row,
          props: {
            ...Objects.camelize(row.props),
            calculateFn: row.props.calculateFn,
            linkToSection: row.props.linkToSection,
            validateFns: row.props.validateFns,
            chart: row.props.chart,
          },
        },
      }
    }
  )

  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)
  const tableNames = await client.map<string>(
    `select distinct t.props ->> 'name' as name
     from ${schema}."table" t
     where t.props ->> 'name' is not null
       and t.props -> 'cycles' ? '${cycle.uuid}'`,
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
      {
        countryIso,
        assessment,
        cycle,
        tableName,
        variableName,
        colName,
        row,
        data,
        validateFns: row.props.validateFns?.[cycle.uuid] ?? col.props.validateFns?.[cycle.uuid],
      },
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
    `delete
     from ${schemaCycle}.node n
     where n.uuid in (${nodeUUIDs.map((uuid) => `'${uuid}'`).join(',')})`
  )
  await client.query(pgp.helpers.insert(values, cs))
}
