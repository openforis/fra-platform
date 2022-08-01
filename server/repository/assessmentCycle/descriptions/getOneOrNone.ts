import { CountryIso } from '@core/country'
import { Objects } from '@core/utils'

import { Assessment, Cycle } from '@meta/assessment'
import { CommentableDescription, CommentableDescriptionName } from '@meta/assessment/commentableDescription'

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
): Promise<CommentableDescription | undefined> => {
  const { countryIso, assessment, cycle, sectionName, name = 'generalComments' } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      select * from ${schemaCycle}.descriptions
      where country_iso = $1
        and section_name = $2
        and name = $3
      `
  return client.oneOrNone<CommentableDescription>(query, [countryIso, sectionName, name], Objects.camelize)
}
