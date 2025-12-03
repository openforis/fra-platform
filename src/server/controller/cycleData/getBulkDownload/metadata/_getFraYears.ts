import { Years } from 'meta/assessment/years'

import { BulkDownloadYear, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'

import { getExtentOfForest } from './_tables/extentOfForest'

export const getFraYears = (props: PropsBulkDownload): BulkDownloadYear => {
  const { cycle } = props

  const fileName: BulkDownloadYear['fileName'] = 'FRA_Years'
  const years: BulkDownloadYear['years'] = Years.fraYears(cycle)
  const tables: BulkDownloadYear['tables'] = [getExtentOfForest(props)]

  return { fileName, years, tables }
}
