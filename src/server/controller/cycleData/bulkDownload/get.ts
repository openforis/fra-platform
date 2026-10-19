import { getCountries } from 'server/controller/cycleData/bulkDownload/_countries'
import { getData } from 'server/controller/cycleData/bulkDownload/_getData'
import { getCSVContentFile } from 'server/controller/cycleData/bulkDownload/csvContent/getCSVContentFile'
import { getBulkDownloadMetadata } from 'server/controller/cycleData/bulkDownload/metadata/getBulkDownloadMetadata'
import { CSVContent, PropsBulkDownload } from 'server/controller/cycleData/bulkDownload/types'

type Props = PropsBulkDownload & { includeClimaticDomain?: boolean; includeVoluntaryUpdates?: boolean }

export const get = async (props: Props): Promise<Array<CSVContent>> => {
  const { assessment, cycle, i18n, includeClimaticDomain, includeVoluntaryUpdates = true } = props

  const propsBulkDownload: PropsBulkDownload = { assessment, cycle, i18n }

  const [metadata, countries] = await Promise.all([
    getBulkDownloadMetadata({ ...propsBulkDownload, includeClimaticDomain }),
    getCountries(propsBulkDownload),
  ])
  const data = await getData({ ...propsBulkDownload, countries, metadata, includeVoluntaryUpdates })

  return metadata.files.map<CSVContent>((file) => {
    return getCSVContentFile({ ...propsBulkDownload, countries, data, file, metadata })
  })
}
