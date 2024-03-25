import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

type Returned = {
  time?: string
}

export const getLastUpdate = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, countryIso, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const timestamp = await client.oneOrNone<Returned>(
    `
      select cs.last_update as time
      from ${schemaCycle}.country_summary cs
      where cs.country_iso = $1
  `,
    [countryIso]
  )

  return timestamp ?? { time: undefined }
}
