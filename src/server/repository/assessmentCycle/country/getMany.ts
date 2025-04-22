import { Objects } from 'utils/objects'

import { Country, CountryIso, RecordCountries } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'

import { getBaseQuery } from './_queries/getBaseQuery'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIsos?: Array<CountryIso>
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { assessment, cycle, countryIsos } = props

  return client.map<Country>(
    `
      ${getBaseQuery({ assessment, cycle, countryIsos })}
      order by c.country_iso
    `,
    [countryIsos],
    (row) => Objects.camelize(row)
  )
}

export const getManyRecord = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountries> => {
  const countries = await getMany(props, client)

  return countries.reduce<RecordCountries>(
    (acc, country) => ({ ...acc, [country.countryIso]: country }),
    {} as Record<CountryIso, Country>
  )
}
