import { Country } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

import { getMany } from './getMany'

type Props = {
  assessment: Assessment
  cycle: Cycle
  datePublished: string
}

export const publishAllAccepted = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { assessment, cycle, datePublished } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const countryIsos = await client.map(
    `
    update ${schemaName}.country
    set last_in_published = $1,
        status = 'published'
    where status = 'accepted'
    returning country_iso
  `,
    [datePublished],
    (row) => row.country_iso
  )

  return getMany({ assessment, cycle, countryIsos }, client)
}
