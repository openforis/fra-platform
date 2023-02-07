import { Assessment, Cycle, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'
import { SectionAdapter } from '@server/repository/adapter'

export const getMany = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<Section>> => {
  const { assessment, cycle } = props
  const schemaName = Schemas.getName(assessment)

  return client.one<Array<Section>>(
    `
        with ss as (select s.parent_id,
                           jsonb_agg(s.* order by (props ->> 'index')::numeric) as sub_sections
                    from ${schemaName}.section s
                    where s.parent_id is not null
                      and props -> 'cycles' ? $1
                    group by s.parent_id
                    order by s.parent_id),
             s as (select s.*,
                          ss.sub_sections
                   from ${schemaName}.section s
                            left join ss on ss.parent_id = s.id
                   where s.parent_id is null
                     and props -> 'cycles' ? $1
                     and ss.sub_sections is not null
                   order by (s.props ->> 'index')::numeric)
        select jsonb_agg(s.*) as data
        from s
        ;
    `,
    [cycle.uuid],
    ({ data }) => data.map(SectionAdapter)
  )
}
