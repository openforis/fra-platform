import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const readSections = async (
  props: { assessmentName: string; assessmentCycleUuid: string },
  client: BaseProtocol = DB
): Promise<any> =>
  client
    .manyOrNone<any>(
      `
        with ss as (
            select s.parent_id,
                   jsonb_agg(s.* order by (props ->> 'index')::numeric) as sub_sections
            from assessment_${props.assessmentName}.section s
            where s.parent_id is not null and props->'cycles' ? $1
            group by s.parent_id
            order by s.parent_id
        )
        select s.*,
               ss.sub_sections
        from assessment_${props.assessmentName}.section s
                 left join ss on ss.parent_id = s.id
        where s.parent_id is null and props->'cycles' ? $1 ? $1
        order by (s.props ->> 'index')::numeric
        ;
    `,
      [props.assessmentCycleUuid]
    )
    .then(Objects.camelize)
