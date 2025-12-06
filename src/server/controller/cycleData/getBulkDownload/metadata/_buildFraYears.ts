import { Years } from 'meta/assessment/years'

import { buildYears } from 'server/controller/cycleData/getBulkDownload/metadata/_buildYears'
import { ExtentOfForestBuilder } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/extentOfForest'
import { GrowingStockCompositionBuilder } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/growingStockComposition'
import { BulkDownloadFilesFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const buildFraYears: BulkDownloadFilesFactory = (props) => {
  const { cycle } = props

  const fileName = 'FRAYears2'
  const includeDeskStudy = true
  const years = Years.fraYears(cycle)
  const builders = [ExtentOfForestBuilder, GrowingStockCompositionBuilder]

  return buildYears({ ...props, builders, fileName, includeDeskStudy, years })
}
