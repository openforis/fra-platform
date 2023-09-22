import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { getCountriesData } from 'server/repository/redis/data/getCountriesData'
import { updateCountryTable } from 'server/repository/redis/data/updateCountryTable'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
} & NodeUpdate

export const updateNode = async (props: Props): Promise<void> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName, value } = props

  const data = await getCountriesData({ assessment, cycle, tables: { [tableName]: {} }, countryISOs: [countryIso] })

  const path = [countryIso, tableName, colName, variableName]
  Objects.setInPath({ obj: data, path, value })

  await updateCountryTable({ assessment, cycle, countryIso, tableName, data })
}
