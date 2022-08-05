import { CountryIso } from '@core/country'
import { Objects } from '@core/utils'

import { Assessment, Cycle } from '@meta/assessment'
import { CommentableDescriptionName } from '@meta/assessment/commentableDescription'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const update = async (
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

  const query = `
          update ${schemaCycle}.descriptions set
            content = $4
          where country_iso = $1
            and section_name = $2
            and name = $3
          returning content`

  return client.oneOrNone<string>(query, [countryIso, sectionName, name, content], Objects.camelize)
}
