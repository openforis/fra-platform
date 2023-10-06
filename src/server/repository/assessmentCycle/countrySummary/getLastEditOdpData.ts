import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
}

type Returned = {
  time?: string
}

export const getLastEditOdpData = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle, countryIso } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const timestamp = await client.oneOrNone<Returned>(
    `
      select cs.last_edit_odp_data as time
      from ${schemaCycle}.country_summary cs
      where cs.country_iso = $1
  `,
    [countryIso]
  )

  return timestamp ?? { time: undefined }
}
