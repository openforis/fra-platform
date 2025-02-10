import { CountryIso } from 'meta/area'
import {
  ActivityLogMessage,
  Assessment,
  CommentableDescriptionName,
  Cycle,
  DescriptionCountryValues,
} from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName?: string
  name?: CommentableDescriptionName
}

export const getValuesLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<DescriptionCountryValues> => {
  const { countryIso, assessment, cycle, sectionName } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.one<DescriptionCountryValues>(
    `with latest_descriptions as (
        select
            al.country_iso,
            al.section as section_name,
            al.target ->> 'name' as name,
            al.target -> 'description' -> 'value' as value,
            row_number() over (partition by al.target ->> 'name' order by al.time desc) as row_number
     from public.activity_log al
         left join ${schemaName}.country_summary cs on al.country_iso = cs.country_iso
     where
           al.target is not null
       and al.message = '${ActivityLogMessage.descriptionUpdate}'
       and al.country_iso = $1
       and al.section = $2
       and cs.last_accepted is not null
       and al.time < cs.last_accepted
         ),
         agg1 as (
     select
         ld.country_iso,
         ld.section_name,
         jsonb_object_agg(ld.name, ld.value) as descriptions
     from latest_descriptions ld
     where ld.row_number = 1
     group by 1, 2
         ),
         agg2 as (
     select
         a.country_iso,
         jsonb_object_agg(a.section_name, a.descriptions) as descriptions
     from agg1 a
     group by 1
         )
    select coalesce(jsonb_object_agg(a.country_iso, a.descriptions), '{}'::jsonb) as descriptions
    from agg2 a;`,
    [countryIso, sectionName],
    ({ descriptions }) => descriptions
  )
}
