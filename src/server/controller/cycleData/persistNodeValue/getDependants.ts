import { CountryIso } from '@meta/area'
import { Assessment, Cycle, TableNames } from '@meta/assessment'

import { AreaController } from '@server/controller/area'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  tableName: string
  variableName: string
  colName: string
}

export const isODPCell = async (props: Props) => {
  const { colName, tableName } = props
  const country = await AreaController.getCountry(props)
  const odpYears = await OriginalDataPointRepository.getReservedYears(props)
  if (![TableNames.forestCharacteristics, TableNames.extentOfForest].includes(tableName as TableNames)) return false
  return country.props.forestCharacteristics.useOriginalDataPoint && odpYears.map(String).includes(colName)
}

// If table is 1a or 1b
// and if there is an ODP year
// and if country.odp = enabled
// we are editing 'under' odp

export const getDependants = async (props: Props) => {
  const { assessment, cycle, tableName, variableName } = props
  const _isODPCell = await isODPCell(props)
  const dependants = assessment.metaCache[cycle.uuid].calculations.dependants[tableName]?.[variableName] ?? []
  if (!_isODPCell) return dependants
  return dependants.filter((dependant) =>
    [TableNames.extentOfForest, TableNames.forestCharacteristics].includes(dependant.tableName as TableNames)
  )
}
