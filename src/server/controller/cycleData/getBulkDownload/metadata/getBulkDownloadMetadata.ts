import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { TableRedisRepository } from 'server/cache/repository/table'
import { getAnnualYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getAnnualYears'
import { getFraYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getFraYears'
import { getIntervalYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getIntervalYears'
import { BulkDownloadMetadata, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'

export const getBulkDownloadMetadata = async (props: PropsBulkDownload): Promise<BulkDownloadMetadata> => {
  const { assessment, cycle } = props
  const { name: cycleName } = cycle

  const forestArea: BulkDownloadMetadata['forestArea'] = {
    colName: cycleName === CycleNames._2020 ? '2020' : '2025',
    tableName: TableNames.extentOfForest,
    variableName: 'forestArea',
  }

  const years: BulkDownloadMetadata['years'] = [getFraYears(props), getAnnualYears(props), getIntervalYears(props)]

  const tables = await TableRedisRepository.getManyRecord({ assessment, cycle })

  return { forestArea, tables, years }
}
