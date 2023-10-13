import { Assessment, Cycle, VariablesCache } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getVariablesCache = async (props: Props, client: BaseProtocol = DB): Promise<VariablesCache> => {
  const { assessment, cycle } = props

  const schema = Schemas.getName(assessment)

  return client.one<VariablesCache>(
    `
        with data as (
            select t.props ->> 'name' as table_name,
                   jsonb_object_agg(
                               r.props ->> 'variableName',
                               jsonb_build_object(
                                       'variableName', r.props ->> 'variableName', 'tableName', t.props ->> 'name'
                                   )) as variables
            from ${schema}.row r
                     left join ${schema}."table" t on r.table_id = t.id
            where r.props ->> 'variableName' is not null
              and t.props -> 'cycles' ? '${cycle.uuid}'
              and r.props -> 'cycles' ? '${cycle.uuid}'
            group by t.props ->> 'name'
        )
        select jsonb_object_agg(data.table_name, data.variables) as cache
        from data
    `,
    [],
    ({ cache }) => cache
  )
}
