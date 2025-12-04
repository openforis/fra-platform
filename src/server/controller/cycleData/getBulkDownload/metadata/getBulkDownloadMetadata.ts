import { getAnnualYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getAnnualYears'
import { getFraYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getFraYears'
import { getIntervalYears } from 'server/controller/cycleData/getBulkDownload/metadata/_getIntervalYears'
import { BulkDownloadMetadata, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'

export const getBulkDownloadMetadata = (props: PropsBulkDownload): BulkDownloadMetadata => {
  const years: BulkDownloadMetadata['years'] = [getFraYears(props), getAnnualYears(props), getIntervalYears(props)]

  return { years }
}
