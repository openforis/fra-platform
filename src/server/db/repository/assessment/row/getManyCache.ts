import { Assessment } from 'meta/assessment/assessment'
import { RowCache } from 'meta/assessment/rowCache'

import { BaseProtocol, DB } from 'server/db/db'
import { RowCacheAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

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
                 left join ${schema}."table" t on r.table_uuid = t.uuid
                 left join ${schema}.table_section ts on t.table_section_uuid = ts.uuid
                 left join ${schema}.section s on ts.section_uuid = s.uuid
                 left join ${schema}.col c on r.id = c.row_id
        where r.props ->> 'variableName' is not null
        group by r.id, r.uuid, r.props, t.props ->> 'name', s.props ->> 'name'
    `,
    [],
    RowCacheAdapter
  )
}
