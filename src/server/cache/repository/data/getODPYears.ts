import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'

import { getCountriesData } from 'server/cache/repository/data/getCountriesData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const getODPYears = async (props: Props): Promise<Array<string>> => {
  const { assessment, countryIso, cycle } = props

  // Non-NDP cycle schemas don't have the national data point table
  if (!cycle.props.ndp) return []

  const tables = { [TableNames.originalDataPointValue]: {} }
  const countryISOs = [countryIso]
  const odpData = await getCountriesData({ assessment, cycle, countryISOs, tables })

  return Object.keys(odpData?.[countryIso]?.[TableNames.originalDataPointValue] ?? {})
}
