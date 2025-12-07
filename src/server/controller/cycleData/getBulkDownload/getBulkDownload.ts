import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'

import { Lang } from 'meta/lang'

import { getCountries } from 'server/controller/cycleData/getBulkDownload/_countries'
import { getData } from 'server/controller/cycleData/getBulkDownload/_data'
import { getCSVContentFile } from 'server/controller/cycleData/getBulkDownload/csvContent/getCSVContentFile'
import { getBulkDownloadMetadata } from 'server/controller/cycleData/getBulkDownload/metadata/getBulkDownloadMetadata'
import { CSVContent, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'

// includeClimaticDomain will be dynamically handled in a separate task
type Props = Omit<PropsBulkDownload, 'i18n'>

export const getBulkDownload = async (props: Props): Promise<Array<CSVContent>> => {
  const { assessment, cycle, includeClimaticDomain = true } = props

  const i18n = (await createI18nPromise(Lang.en)) as i18nType

  const propsBulkDownload: PropsBulkDownload = { assessment, cycle, includeClimaticDomain, i18n }

  const [metadata, countries] = await Promise.all([
    getBulkDownloadMetadata(propsBulkDownload),
    getCountries(propsBulkDownload),
  ])
  const [data, descriptions] = await getData({ ...propsBulkDownload, countries, metadata })

  const propsContent = { ...propsBulkDownload, countries, data, descriptions, metadata }

  return metadata.files.map<CSVContent>((file) => {
    return getCSVContentFile({ ...propsContent, file })
  })
}
