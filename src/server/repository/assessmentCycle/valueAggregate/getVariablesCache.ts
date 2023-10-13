import { Assessment, Cycle, TableNames, VariablesCache } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getVariablesCache = async (props: Props, client: BaseProtocol = DB): Promise<VariablesCache> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<VariablesCache>(
    `
      with v as (select distinct v.variable_name,
                                 jsonb_build_object('tableName', 'value_aggregate', 'variableName',
                                                    v.variable_name) as var
                 from ${schemaCycle}.value_aggregate v)
      select jsonb_object_agg(v.variable_name, v.var order by v.variable_name) as data
      from v
  `,
    [],
    ({ data }) => ({ [TableNames.valueAggregate]: data })
  )
}
