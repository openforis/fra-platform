import { Years } from 'meta/assessment/years'

import { getAreaAffectedByFire } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/areaAffectedByFire'
import { getDisturbances } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/disturbances'
import { BulkDownloadYearFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import { BulkDownloadYear } from 'server/controller/cycleData/getBulkDownload/types'

export const getAnnualYears: BulkDownloadYearFactory = (props) => {
  const { cycle } = props

  const fileName: BulkDownloadYear['fileName'] = 'Annual'
  const years: BulkDownloadYear['years'] = Years.annual(cycle)
  const tables: BulkDownloadYear['tables'] = [getDisturbances(props), getAreaAffectedByFire(props)]

  return { fileName, includeDeskStudy: false, years, tables }
}
