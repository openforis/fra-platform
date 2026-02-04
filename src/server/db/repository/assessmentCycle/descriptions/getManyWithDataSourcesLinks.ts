import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

export const getManyWithDataSourcesLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<CommentableDescription>> => {
  const { assessment, countryIso, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const countryIsoCondition = countryIso ? 'and country_iso = $(countryIso)' : ''

  return client.map<CommentableDescription>(
    `
        select * from ${schemaName}.descriptions
        where exists (
          select from jsonb_array_elements(value->'dataSources') as data_source
          where data_source ->> 'reference' ilike '%href%'
        )
        ${countryIsoCondition}
      `,
    { countryIso },
    (row) => Objects.camelize(row)
  )
}
