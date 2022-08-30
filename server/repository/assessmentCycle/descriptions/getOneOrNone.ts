import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { CommentableDescriptionName } from '@meta/assessment/commentableDescription'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getOneOrNone = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    sectionName: string
    name?: CommentableDescriptionName
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { countryIso, assessment, cycle, sectionName, name = 'generalComments' } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      select content from ${schemaCycle}.descriptions
      where country_iso = $1
        and section_name = $2
        and name = $3
      `
  return client.oneOrNone<string>(query, [countryIso, sectionName, name], Objects.camelize)
}
