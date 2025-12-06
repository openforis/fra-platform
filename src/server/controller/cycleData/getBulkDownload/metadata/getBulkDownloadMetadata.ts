import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { TableRedisRepository } from 'server/cache/repository/table'
import { buildFraYears } from 'server/controller/cycleData/getBulkDownload/metadata/_buildFraYears'
import { getForestPolicy } from 'server/controller/cycleData/getBulkDownload/metadata/_files/forestPolicy'
import { getNDPYear } from 'server/controller/cycleData/getBulkDownload/metadata/_files/ndpYear'
import { getNonWoodForestProducts } from 'server/controller/cycleData/getBulkDownload/metadata/_files/nonWoodForestProducts'
import { getAnnualYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getAnnualYears'
import { getFraYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getFraYears'
import { getIntervalYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getIntervalYears'
import {
  BulkDownloadMetadata,
  PropsBulkDownload,
  PropsBulkDownloadFileBuilder,
} from 'server/controller/cycleData/getBulkDownload/types'

export const getBulkDownloadMetadata = async (props: PropsBulkDownload): Promise<BulkDownloadMetadata> => {
  const { assessment, cycle } = props
  const { name: cycleName } = cycle

  const colName = cycleName === CycleNames._2020 ? '2020' : '2025'
  const colForestArea: BulkDownloadMetadata['colForestArea'] = {
    csvColumn: `forest area ${colName}`,
    colName,
    tableName: TableNames.extentOfForest,
    variableName: 'forestArea',
  }

  const tables = await TableRedisRepository.getManyRecord({ assessment, cycle })

  const propsFileBuilder: PropsBulkDownloadFileBuilder = { ...props, tables }
  const files: BulkDownloadMetadata['files'] = [
    ...buildFraYears(propsFileBuilder),
    getNonWoodForestProducts(propsFileBuilder),
    getForestPolicy(propsFileBuilder),
    getNDPYear(propsFileBuilder),
  ]

  const years: BulkDownloadMetadata['years'] = [getFraYears(props), getAnnualYears(props), getIntervalYears(props)]

  return { colForestArea, files, tables, years }
}
