import { CycleNames } from 'meta/assessment/cycle/names'
import { Years } from 'meta/assessment/years'

import { getAnnualReforestation } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/annualReforestation'
import { getForestAreaChange } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestAreaChange'
import { BulkDownloadYearFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import { BulkDownloadYear } from 'server/controller/cycleData/getBulkDownload/types'

export const getIntervalYears: BulkDownloadYearFactory = (props) => {
  const { cycle } = props
  const { name: cycleName } = cycle

  const fileName: BulkDownloadYear['fileName'] = 'Intervals'
  const years: BulkDownloadYear['years'] = Years.intervals(cycle)
  const tables: BulkDownloadYear['tables'] = [
    getForestAreaChange(props),
    ...(cycleName === CycleNames._2020 ? [getAnnualReforestation(props)] : []),
  ]

  return { fileName, includeDeskStudy: false, years, tables }
}
