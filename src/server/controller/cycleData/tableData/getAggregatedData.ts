import { RegionCode } from 'meta/area/regionCode'
import { RecordAssessmentData } from 'meta/data/recordData'

import { BaseProtocol, DB } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { DataRepository } from 'server/db/repository/assessmentCycle/data'

import { getTablesCondition } from './_tablesCondition'
import { PropsGetTableData } from './props'

type Props = PropsGetTableData & { regionCode: RegionCode }

export const getAggregatedData = async (props: Props, client: BaseProtocol = DB): Promise<RecordAssessmentData> => {
  const {
    assessment,
    columns,
    countryISOs: countryISOsProp,
    cycle,
    mergeOdp,
    regionCode,
    tableNames,
    variables,
  } = props
  const tables = getTablesCondition({ tableNames, columns, variables, mergeOdp })

  // If we have more than one countryIso, then we are given a subset of countries
  const countryISOs =
    countryISOsProp.length > 1
      ? countryISOsProp
      : await CountryRepository.getCountryIsos({ assessment, cycle, regionCode }, client)

  const faoEstimates = await DataRepository.getFaoEstimateData(
    { assessment, cycle, countryISOs, regionCode, tables },
    client
  )

  return {
    [assessment.props.name]: {
      [cycle.name]: faoEstimates,
    },
  }
}
