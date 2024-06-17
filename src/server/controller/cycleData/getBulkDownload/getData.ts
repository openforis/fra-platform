import { getTableData } from '../getTableData'
import { Props } from './props'

export const getData = async (props: Props & { tableNames: Array<string> }) => {
  const { assessment, cycle, countries, tableNames } = props
  return getTableData({
    assessment,
    cycle,
    countryISOs: countries.map(({ countryIso }) => countryIso),
    tableNames,
    mergeOdp: true,
  })
}
