import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'

import { Lang } from 'meta/lang'

import { getCountries } from 'server/controller/cycleData/getBulkDownload/_countries'
import { getData } from 'server/controller/cycleData/getBulkDownload/_data'
import { getCSVContentVariable } from 'server/controller/cycleData/getBulkDownload/csvContent/getCSVContentVariable'
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

  const propsContent = { assessment, countries, cycle, data, i18n, includeClimaticDomain }

  return [
    ...metadata.years.flatMap((yearMeta) => {
      return [
        // years csv files
        getCSVContentVariables({ ...propsContent, yearMeta }),
        // years singe variable csv files
        ...yearMeta.tables.flatMap((table) => {
          return table.variables.map((variable) => {
            return getCSVContentVariable({ ...propsContent, yearMeta, table, variable })
          })
        }),
      ]
    }),
  ]
}
