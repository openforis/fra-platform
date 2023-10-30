import { CountryIso } from 'meta/area'
import { Assessment, CommentableDescriptionName, Cycle, DescriptionCountryValues } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName?: string
  name?: CommentableDescriptionName
}

export const getValues = async (props: Props, client: BaseProtocol = DB): Promise<DescriptionCountryValues> => {
  const { countryIso, assessment, cycle, sectionName, name } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<DescriptionCountryValues>(
    `with agg1 as
              (select d.country_iso,
                      d.section_name,
                      jsonb_object_agg(d.name, d.value) as descriptions
               from ${schemaCycle}.descriptions d
               where d.country_iso = $1
                 ${sectionName ? `and d.section_name = $2` : ``}
                 ${name ? `and d.name = $3` : ``}
               group by 1, 2),
          agg2 as
              (select a.country_iso,
                      jsonb_object_agg(a.section_name, a.descriptions) as descriptions
               from agg1 a
               group by 1)
     select coalesce(jsonb_object_agg(a.country_iso, a.descriptions), '{}'::jsonb) as descriptions
     from agg2 a`,
    [countryIso, sectionName, name],
    ({ descriptions }) => descriptions
  )
}
