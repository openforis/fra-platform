import { RecordAssessmentData } from 'meta/data/recordData'

import { getTableData } from '../getTableData'
import { Props } from './props'

export const getData = async (props: Props & { tableNames: Array<string> }): Promise<RecordAssessmentData> => {
  const { assessment, countries, cycle, tableNames } = props
  return getTableData({
    assessment,
    cycle,
    countryISOs: countries.map(({ countryIso }) => countryIso),
    tableNames,
    mergeOdp: true,
  })
}
