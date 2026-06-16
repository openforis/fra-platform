import { Years } from 'meta/assessment/years'

import { buildYears } from 'server/controller/cycleData/bulkDownload/metadata/_buildYears'
import { AreaAffectedByFireBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/areaAffectedByFire'
import { DisturbancesBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/disturbances'
import { BulkDownloadFilesFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'

export const buildAnnualYears: BulkDownloadFilesFactory = (props) => {
  const { cycle } = props

  const fileName = 'Annual'
  const includeDeskStudy = true
  const years = Years.annual(cycle)
  const builders = [DisturbancesBuilder, AreaAffectedByFireBuilder]

  return buildYears({ ...props, builders, fileName, includeDeskStudy, includeFlag: true, years })
}
