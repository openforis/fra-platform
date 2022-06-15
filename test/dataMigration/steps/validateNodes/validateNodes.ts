import { Objects } from '@core/utils'

import { Assessment, Cycle, Node, Row } from '@meta/assessment'

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

  const nodes = await client.map<Node & { tableName: string; colName: string; row: Row }>(
    `
        select n.*,
               t.props ->> 'name'    as table_name,
               c.props ->> 'colName' as col_name,
               to_jsonb(r.*)         as row
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

  await client.tx((t) => {
    const queries = []
    while (nodes.length) {
      const { countryIso, tableName, colName, row } = nodes.shift()
      const { variableName } = row.props
      const query = validateNode({ countryIso, assessment, cycle, tableName, variableName, colName, row, data }, t)
      queries.push(query)
    }
    return t.batch(queries)
  })
}
