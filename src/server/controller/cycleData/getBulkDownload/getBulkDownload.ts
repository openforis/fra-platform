import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'

import { Lang } from 'meta/lang'

import { getCountries } from 'server/controller/cycleData/getBulkDownload/_countries'
import { getData } from 'server/controller/cycleData/getBulkDownload/_data'
import { getCSVContentVariables } from 'server/controller/cycleData/getBulkDownload/csvContent/getCSVContentVariables'
import { getBulkDownloadMetadata } from 'server/controller/cycleData/getBulkDownload/metadata/getBulkDownloadMetadata'
import { CSVContent, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'

// includeClimaticDomain will be dynamically handled in a separate task
type Props = PropsBulkDownload & { includeClimaticDomain?: boolean }

export const getBulkDownload = async (props: Props): Promise<Array<CSVContent>> => {
  const { assessment, cycle, includeClimaticDomain = true } = props

  const metadata = getBulkDownloadMetadata({ assessment, cycle })

  const i18n = (await createI18nPromise(Lang.en)) as i18nType
  const countries = await getCountries({ assessment, cycle })
  const data = await getData({ assessment, countries, cycle, metadata })

  const csvEntries: Array<CSVContent> = []
  const propsContent = { assessment, countries, cycle, data, i18n, includeClimaticDomain }

  // years csv files
  await Promise.all(
    metadata.years.map(async (yearMeta) => {
      const csvEntry = await getCSVContentVariables({ ...propsContent, yearMeta })
      csvEntries.push(csvEntry)
    })
  )

  return csvEntries
}
