import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'

import { getData } from 'server/controller/cycleData/tableData/getData'
import { getLastPublishedData } from 'server/controller/cycleData/tableData/getLastPublishedData'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  isLastPublishedCycle: boolean
  tableNames: Array<string>
}

export const _getTableData = async (props: Props): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, isLastPublishedCycle, tableNames } = props

  if (isLastPublishedCycle) {
    return getLastPublishedData({ assessment, countryISOs, tableNames })
  }

  return getData({ assessment, countryISOs, cycle, mergeOdp: true, tableNames })
}
