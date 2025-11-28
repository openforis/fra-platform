import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  showHidden?: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Section>> => {
  const { assessment, cycle, showHidden = false } = props
  const schemaName = Schemas.getName(assessment)

  return client.one<Array<Section>>(
    `
        with ss as (select s.parent_uuid,
                           jsonb_agg(s.* order by (props ->> 'index')::numeric) as sub_sections
                    from ${schemaName}.section s
                    where s.parent_uuid is not null
                      and props -> 'cycles' ? $1
                      and ($2 = true or (coalesce(s.props -> 'hidden' ->> '${cycle.uuid}', 'false', 'false')::boolean = false and $2 = false))
                    group by s.parent_uuid
                    order by s.parent_uuid),
             s as (select s.*,
                          ss.sub_sections
                   from ${schemaName}.section s
                            left join ss on ss.parent_uuid = s.uuid
                   where s.parent_uuid is null
                     and props -> 'cycles' ? $1
                     and ss.sub_sections is not null
                     and ($2 = true or (coalesce(s.props -> 'hidden' ->> '${cycle.uuid}', 'false', 'false')::boolean = false and $2 = false))
                   order by (s.props ->> 'index')::numeric)
        select jsonb_agg(s.*) as data
        from s
        ;
    `,
    [cycle.uuid, showHidden],
    ({ data }) => data.map(SectionAdapter)
  )
}
