import { Country } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getMany } from './getMany'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const publishAll = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { assessment, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const countryIsos = await client.map(
    `
    update ${schemaName}.country
    set last_in_published = now()
    where status != 'published'
    returning country_iso
  `,
    [],
    (row) => row.country_iso
  )

  return getMany({ assessment, cycle, countryIsos }, client)
}
