import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, CommentableDescriptionName, CommentableDescriptionValue, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const getOneOrNone = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    sectionName: string
    name?: CommentableDescriptionName
  },
  client: BaseProtocol = DB
): Promise<CommentableDescriptionValue> => {
  const { countryIso, assessment, cycle, sectionName, name = 'generalComments' } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      select value from ${schemaCycle}.descriptions
      where country_iso = $1
        and section_name = $2
        and name = $3
      `
  return client.oneOrNone<CommentableDescriptionValue>(query, [countryIso, sectionName, name], Objects.camelize)
}
