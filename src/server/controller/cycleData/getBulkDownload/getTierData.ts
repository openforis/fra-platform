import { RecordAssessmentDatas } from 'meta/data'

import { climaticDomain } from 'server/controller/cycleData/getBulkDownload/climaticDomain'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { Props } from 'server/controller/cycleData/getBulkDownload/props'

const baseVariables = ['status']

const tableNames = [
  { tableName: 'extentofforest_forestareastatusandtrend', csvPrefix: '1a', variables: [...baseVariables, 'trend'] },
  { tableName: 'growingstock_growingstockstatus', csvPrefix: '2a', variables: baseVariables },
  { tableName: 'biomassstock_biomassstockstatus', csvPrefix: '2c', variables: baseVariables },
]

export const getTierData = async (props: Props): Promise<Array<Record<string, string>>> => {
  const { assessment, cycle, countries } = props
  const _climaticData = await climaticDomain(props)
  const climaticData = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: _climaticData,
  })

  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames: tableNames.map(({ tableName }) => tableName),
  })

  return countries.map(({ countryIso, regionCodes }) => {
    const base: Record<string, string> = {
      regions: regionCodes.join(';'),
      iso3: countryIso,
      name: countryIso,
      boreal: getClimaticValue('boreal', countryIso, climaticData),
      temperate: getClimaticValue('temperate', countryIso, climaticData),
      tropical: getClimaticValue('tropical', countryIso, climaticData),
      subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
    }

    tableNames.forEach(({ tableName, csvPrefix, variables }) => {
      variables.forEach((key) => {
        base[`${csvPrefix}_${key}`] = RecordAssessmentDatas.getDatum({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          data,
          countryIso,
          tableName,
          variableName: key,
          colName: key,
        })
      })
    })

    return base
  })
}
