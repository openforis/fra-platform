import { Assessment, RowCache } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { RowCacheAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
}

export const getManyCache = (props: Props, client: BaseProtocol = DB): Promise<Array<RowCache>> => {
  const { assessment } = props
  const schema = Schemas.getName(assessment)

  return client.map<RowCache>(
    `
        select r.*
             , t.props ->> 'name' as table_name
             , s.props ->> 'name' as section_name
             , coalesce(jsonb_agg(c.*) filter (where c.uuid is not null), '[]') as cols
        from ${schema}.row r
                 left join ${schema}."table" t on r.table_id = t.id
                 left join ${schema}.table_section ts on t.table_section_id = ts.id
                 left join ${schema}.section s on ts.section_id = s.id
                 left join ${schema}.col c on r.id = c.row_id
        where r.props ->> 'variableName' is not null
        group by r.id, r.uuid, r.props, t.props ->> 'name', s.props ->> 'name'
    `,
    [],
    RowCacheAdapter
  )
}
