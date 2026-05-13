import { BulkDownloadFileYearsBuilderConstructor } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/_fileYearsBuilder'
import {
  BulkDownloadFile,
  BulkDownloadRow,
  CSVPostProcessor,
  PropsBulkDownloadFileBuilder,
} from 'server/controller/cycleData/getBulkDownload/types'

type Props = PropsBulkDownloadFileBuilder & {
  builders: Array<BulkDownloadFileYearsBuilderConstructor>
  fileName: string
  includeDeskStudy?: boolean
  includeFlagLegend?: boolean
  years: Array<string>
}

export const buildYears = (props: Props): Array<BulkDownloadFile> => {
  const {
    assessment,
    builders,
    cycle,
    fileName,
    i18n,
    includeClimaticDomain,
    includeDeskStudy,
    includeFlagLegend,
    tables,
    withFlag,
    years,
  } = props

  let csvPostProcessor: CSVPostProcessor | undefined
  if (includeFlagLegend) {
    const legendEntries = [
      i18n.t('bulkDownload.flag.legend'),
      i18n.t('bulkDownload.flag.A'),
      i18n.t('bulkDownload.flag.I'),
      i18n.t('bulkDownload.flag.M'),
      i18n.t('bulkDownload.flag.O'),
    ]
    csvPostProcessor = ({ rows }: Parameters<CSVPostProcessor>[0]): void => {
      legendEntries.forEach((entry, index) => {
        rows[index]?.push(`"${entry}"`)
      })
    }
  }

  // init main file
  const file: BulkDownloadFile = {
    csvPostProcessor,
    fileName,
    includeClimaticDomain,
    includeDeskStudy,
    rows: years.map<BulkDownloadRow>((colYear) => {
      return { colNodes: [], colYear }
    }),
  }

  const files = builders.flatMap<BulkDownloadFile>((Builder) => {
    const builder = new Builder({ file, props: { assessment, cycle, includeClimaticDomain, i18n, tables, withFlag } })

    years.forEach((year, index) => {
      const row = file.rows.at(index)
      row.colNodes.push(...builder.buildRowColNodes({ year }))
    })

    return builder.buildSingleFiles({ years })
  })

  return [file, ...files]
}
