import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  ids: Array<number>
}

export const getManyByIds = async (props: Props, client: BaseProtocol = DB): Promise<Array<CommentableDescription>> => {
  const { assessment, countryIso, cycle, ids } = props
  if (Objects.isEmpty(ids)) return []

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<CommentableDescription>(
    `
      select *
      from ${schemaName}.descriptions
      where country_iso = $(countryIso)
        and id in ($(ids:list))
    `,
    { countryIso, ids },
    (row) => Objects.camelize(row)
  )
}
