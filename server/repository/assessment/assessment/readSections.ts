import { Objects } from '@core/utils'

import { Assessment, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const readSections = async (
  props: { assessment: Assessment; assessmentCycleUuid: string },
  client: BaseProtocol = DB
): Promise<Array<Section>> => {
  const schemaName = Schemas.getName(props.assessment)
  return client.one<Array<Section>>(
    `
        with ss as (
            select s.parent_id,
                   jsonb_agg(s.* order by (props ->> 'index')::numeric) as sub_sections
            from ${schemaName}.section s
            where s.parent_id is not null
              and props -> 'cycles' ? $1
            group by s.parent_id
            order by s.parent_id
        ),
             s as (
                 select s.*,
                        ss.sub_sections
                 from ${schemaName}.section s
                          left join ss on ss.parent_id = s.id
                 where s.parent_id is null
                   and props -> 'cycles' ? $1
                 order by (s.props ->> 'index')::numeric
             )
        select jsonb_agg(s.*) as data
        from s
        ;
    `,
    [props.assessmentCycleUuid],
    ({ data }) => Objects.camelize(data)
  )
}
