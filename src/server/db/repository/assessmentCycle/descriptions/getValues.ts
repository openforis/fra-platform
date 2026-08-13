import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  names?: Array<CommentableDescriptionName>
  sectionNames?: Array<SectionName>
}

export const getValues = async (props: Props, client: BaseProtocol = DB): Promise<DescriptionCountryValues> => {
  const { assessment, countryISOs, cycle, names, sectionNames } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const hasNames = !Objects.isEmpty(names)
  const hasSectionNames = !Objects.isEmpty(sectionNames)

  return client.one<DescriptionCountryValues>(
    `with agg1 as
              (select d.country_iso,
                      d.section_name,
                      jsonb_object_agg(d.name, d.value) as descriptions
               from ${schemaCycle}.descriptions d
               where d.country_iso in ($(countryISOs:csv))
                 ${hasSectionNames ? `and d.section_name in ($(sectionNames:csv))` : ``}
                 ${hasNames ? `and d.name in ($(names:csv))` : ``}
               group by 1, 2),
          agg2 as
              (select a.country_iso,
                      jsonb_object_agg(a.section_name, a.descriptions) as descriptions
               from agg1 a
               group by 1)
     select coalesce(jsonb_object_agg(a.country_iso, a.descriptions), '{}'::jsonb) as descriptions
     from agg2 a`,
    { countryISOs, names, sectionNames },
    ({ descriptions }) => descriptions
  )
}
