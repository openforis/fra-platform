import { TableNames } from 'meta/assessment/table'

import { getTableData } from '../getTableData'
import { Props } from './props'

// used by all CSVs
export const climaticDomain = (props: Props) => {
  const { assessment, countries, cycle } = props
  return getTableData({
    assessment,
    cycle,
    countryISOs: countries.map(({ countryIso }) => countryIso),
    tableNames: [TableNames.climaticDomain],
    mergeOdp: true,
  })
}
