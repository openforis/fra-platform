import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, CommentableDescriptionName, CommentableDescriptionValue, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

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
  const { countryIso, assessment, cycle, sectionName, name, value } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // insert new | on conflict update
  const query = `
      insert into
          ${schemaCycle}.descriptions (country_iso, section_name, name, value)
          values ($1, $2, $3, $4)
      on conflict (country_iso, section_name, name) do update 
            set value = $4
      returning value;
    `

  return client.oneOrNone<string>(query, [countryIso, sectionName, name, value], Objects.camelize)
}
