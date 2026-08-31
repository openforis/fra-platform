import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { RecordCountryData } from 'meta/data/recordData'
import { TablesCondition } from 'meta/data/tableCondition'
import { Objects } from 'utils/objects'

import { BaseProtocol } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
  data: RecordCountryData
  excludeOdpTable?: boolean
  tables: TablesCondition
}

type PropsInnerMerge = {
  countryIso: CountryIso
  data: RecordCountryData
  tableName: TableNames.extentOfForest | TableNames.forestCharacteristics
}

const _mergeODPTable = (props: PropsInnerMerge): void => {
  const { countryIso, data, tableName } = props

  const odpData = data?.[countryIso]?.[TableNames.originalDataPointValue]
  if (odpData) {
    const dataMerged = { ...data[countryIso][tableName], ...odpData }
    Objects.setInPath({ obj: data, path: [countryIso, tableName], value: dataMerged })
  }
}

export const mergeOdpCountryData = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, countryISOs, cycle, data, excludeOdpTable, tables } = props

  // TODO: add country cache and add AreaRedisRepository.getCountriesRecord()
  const countries = await CountryRepository.getManyRecord({ assessment, cycle, countryIsos: countryISOs }, client)

  countryISOs.forEach((countryIso) => {
    const country = countries[countryIso]
    if (tables[TableNames.extentOfForest]) {
      _mergeODPTable({ countryIso, data, tableName: TableNames.extentOfForest })
    }
    if (tables[TableNames.forestCharacteristics] && country.props.forestCharacteristics.useOriginalDataPoint) {
      _mergeODPTable({ countryIso, data, tableName: TableNames.forestCharacteristics })
    }
    if (excludeOdpTable) {
      Objects.unset(data, [countryIso, TableNames.originalDataPointValue])
    }
  })
}
