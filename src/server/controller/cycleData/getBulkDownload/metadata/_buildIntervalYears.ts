import { CycleNames } from 'meta/assessment/cycle/names'
import { Years } from 'meta/assessment/years'

import { buildYears } from 'server/controller/cycleData/getBulkDownload/metadata/_buildYears'
import { AnnualReforestationBuilder } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/annualReforestation'
import { ForestAreaChangeBuilder } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestAreaChange'
import { BulkDownloadFilesFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const buildIntervalYears: BulkDownloadFilesFactory = (props) => {
  const { cycle } = props
  const { name: cycleName } = cycle
  const is2020 = cycleName === CycleNames._2020

  const fileName = 'Intervals'
  const years = Years.intervals(cycle)
  const builders = [ForestAreaChangeBuilder, ...(is2020 ? [AnnualReforestationBuilder] : [])]

  return buildYears({ ...props, builders, fileName, years })
}
