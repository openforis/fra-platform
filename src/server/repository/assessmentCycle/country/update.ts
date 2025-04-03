import * as pgPromise from 'pg-promise'

import { Country } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOne } from './getOne'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  lastUpdate?: boolean
  lastEdit?: boolean
  lastEditOdp?: boolean
  lastInStatus?: boolean
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<Country> => {
  const { country, assessment, cycle, lastUpdate, lastEdit, lastEditOdp, lastInStatus } = props
  const { countryIso } = country
  const { status, ...countryProps } = country.props

  const pgp = pgPromise()
  const updateData = {
    props: countryProps,
    status,
  }

  const timestampFields = [
    { name: `last_in_${status}`, enabled: lastInStatus },
    { name: 'last_update', enabled: lastUpdate },
    { name: 'last_edit', enabled: lastEdit },
    { name: 'last_edit_odp', enabled: lastEditOdp },
  ]

  const columns = [
    'props',
    'status',
    ...timestampFields.filter(({ enabled }) => enabled).map(({ name }) => ({ name, init: () => 'now()' })),
  ]

  const cs = new pgp.helpers.ColumnSet(columns, {
    table: { table: 'country', schema: Schemas.getNameCycle(assessment, cycle) },
  })

  const query = `${pgp.helpers.update(updateData, cs)} WHERE country_iso = $1`
  await client.none(query, [countryIso])
  return getOne({ assessment, cycle, countryIso }, client)
}
