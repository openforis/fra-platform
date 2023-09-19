import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableNames } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { BaseProtocol } from 'server/db'
import { DataRedisRepository } from 'server/repository/redis/data'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  tableName: string
  colName: string
}

export const isODPCell = async (props: Props, client: BaseProtocol) => {
  const { assessment, cycle, countryIso, colName, tableName } = props
  if (![TableNames.forestCharacteristics, TableNames.extentOfForest].includes(tableName as TableNames)) return false

  const country = await AreaController.getCountry(props, client)

  const odpYears = await DataRedisRepository.getODPYears({ assessment, cycle, countryIso })

  const useOriginalDataPoint =
    tableName === TableNames.extentOfForest || country.props.forestCharacteristics.useOriginalDataPoint
  return useOriginalDataPoint && odpYears.includes(colName)
}
