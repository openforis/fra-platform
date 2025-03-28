import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'

import { getCountriesData } from 'server/repository/redis/data/getCountriesData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const getODPYears = async (props: Props): Promise<Array<string>> => {
  const { assessment, cycle, countryIso } = props

  const tables = { [TableNames.originalDataPointValue]: {} }
  const countryISOs = [countryIso]
  const odpData = await getCountriesData({ assessment, cycle, countryISOs, tables })

  return Object.keys(odpData?.[countryIso]?.[TableNames.originalDataPointValue] ?? {})
}
