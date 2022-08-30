import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { CommentableDescriptionName } from '@meta/assessment/commentableDescription'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const upsert = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    content: string
    sectionName: string
    name: CommentableDescriptionName
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { countryIso, assessment, cycle, sectionName, name, content } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // insert new | on conflict update
  const query = `
      insert into
          ${schemaCycle}.descriptions (country_iso, section_name, name, content)
          values ($1, $2, $3, $4)
      on conflict (country_iso, section_name, name) do update 
            set content = $4
      returning content;
    `

  return client.oneOrNone<string>(query, [countryIso, sectionName, name, content], Objects.camelize)
}
