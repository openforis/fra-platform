import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

import { getTableData } from '../getTableData'
import { Props } from './props'

// used by all CSVs
export const climaticDomain = (props: Props): Promise<RecordAssessmentData> => {
  const { assessment, countries, cycle } = props
  return getTableData({
    assessment,
    cycle,
    countryISOs: countries.map(({ countryIso }) => countryIso),
    tableNames: [TableNames.climaticDomain],
    mergeOdp: true,
  })
}
