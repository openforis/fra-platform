import { BulkDownloadFileYearsBuilderConstructor } from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'
import {
  BulkDownloadFile,
  BulkDownloadRow,
  PropsBulkDownloadFileBuilder,
} from 'server/controller/cycleData/bulkDownload/types'

type Props = PropsBulkDownloadFileBuilder & {
  builders: Array<BulkDownloadFileYearsBuilderConstructor>
  fileName: string
  includeDeskStudy?: boolean
  includeFlag?: boolean
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
    includeFlag,
    tables,
    years,
  } = props

  // init main file
  const file: BulkDownloadFile = {
    fileName,
    includeClimaticDomain,
    includeDeskStudy,
    rows: years.map<BulkDownloadRow>((colYear) => {
      return { colNodes: [], colYear }
    }),
    includeFlag,
  }

  const files = builders.flatMap<BulkDownloadFile>((Builder) => {
    const builder = new Builder({ file, props: { assessment, cycle, includeClimaticDomain, i18n, tables } })

    years.forEach((year, index) => {
      const row = file.rows.at(index)
      row.colNodes.push(...builder.buildRowColNodes({ year }))
    })

    return builder.buildSingleFiles({ years })
  })

  return [file, ...files]
}
