import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const upsert = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    value: CommentableDescriptionValue
    sectionName: string
    name: CommentableDescriptionName
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { assessment, countryIso, cycle, name, sectionName, value } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // insert new | on conflict update
  const query = `
      insert into
          ${schemaCycle}.descriptions (country_iso, section_name, name, value)
          values ($1, $2, $3, $4)
      on conflict (country_iso, section_name, section_uuid, name) do update 
            set value = $4
      returning value;
    `

  return client.oneOrNone<string>(query, [countryIso, sectionName, name, value], Objects.camelize)
}
