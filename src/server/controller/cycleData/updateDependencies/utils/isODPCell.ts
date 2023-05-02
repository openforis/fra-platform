import { CountryIso } from '@meta/area'
import { Assessment, Cycle, TableNames } from '@meta/assessment'

import { AreaController } from '@server/controller/area'
import { BaseProtocol } from '@server/db'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  tableName: string
  colName: string
}

export const isODPCell = async (props: Props, client: BaseProtocol) => {
  const { colName, tableName } = props
  if (![TableNames.forestCharacteristics, TableNames.extentOfForest].includes(tableName as TableNames)) return false

  const [country, odpYears] = await Promise.all([
    AreaController.getCountry(props, client),
    OriginalDataPointRepository.getReservedYears(props, client).map((reservedYear) => reservedYear.year),
  ])

  const useOriginalDataPoint =
    tableName === TableNames.extentOfForest || country.props.forestCharacteristics.useOriginalDataPoint
  return useOriginalDataPoint && odpYears.map(String).includes(colName)
}
