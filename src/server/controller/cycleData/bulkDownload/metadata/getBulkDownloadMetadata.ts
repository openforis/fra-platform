import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { TableRedisRepository } from 'server/cache/repository/table'
import { buildAnnualYears } from 'server/controller/cycleData/bulkDownload/metadata/_buildAnnualYears'
import { buildFraYears } from 'server/controller/cycleData/bulkDownload/metadata/_buildFraYears'
import { buildIntervalYears } from 'server/controller/cycleData/bulkDownload/metadata/_buildIntervalYears'
import { getDegradedForest } from 'server/controller/cycleData/bulkDownload/metadata/_files/degradedForest'
import { getForestPolicy } from 'server/controller/cycleData/bulkDownload/metadata/_files/forestPolicy'
import { getForestRestoration } from 'server/controller/cycleData/bulkDownload/metadata/_files/forestRestoration'
import { getNDPYear } from 'server/controller/cycleData/bulkDownload/metadata/_files/ndpYear'
import { getNonWoodForestProducts } from 'server/controller/cycleData/bulkDownload/metadata/_files/nonWoodForestProducts'
import { getTierData } from 'server/controller/cycleData/bulkDownload/metadata/_files/tierData'
import {
  BulkDownloadMetadata,
  PropsBulkDownload,
  PropsBulkDownloadFileBuilder,
} from 'server/controller/cycleData/bulkDownload/types'

type Props = PropsBulkDownload & { includeClimaticDomain?: boolean }

export const getBulkDownloadMetadata = async (props: Props): Promise<BulkDownloadMetadata> => {
  const { assessment, cycle, i18n, includeClimaticDomain } = props
  const { name: cycleName } = cycle
  const is2020 = cycleName === CycleNames._2020

  const colNameForestArea = is2020 ? '2020' : '2025'
  const colForestArea: BulkDownloadMetadata['colForestArea'] = {
    csvColumn: `forest area ${colNameForestArea}`,
    colName: colNameForestArea,
    tableName: TableNames.extentOfForest,
    variableName: 'forestArea',
  }

  const tables = await TableRedisRepository.getManyRecord({ assessment, cycle })

  const propsFileBuilder: PropsBulkDownloadFileBuilder = { assessment, cycle, i18n, includeClimaticDomain, tables }
  const files: BulkDownloadMetadata['files'] = [
    ...buildFraYears(propsFileBuilder),
    ...buildAnnualYears(propsFileBuilder),
    ...buildIntervalYears(propsFileBuilder),
    getNonWoodForestProducts(propsFileBuilder),
    getForestPolicy(propsFileBuilder),
    getNDPYear(propsFileBuilder),
    ...(is2020
      ? []
      : [getDegradedForest(propsFileBuilder), getForestRestoration(propsFileBuilder), getTierData(propsFileBuilder)]),
  ]

  return { colForestArea, files }
}
