import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Dates } from 'utils/dates'

import {
  BulkDownloadData,
  BulkDownloadFile,
  BulkDownloadMetadata,
  CSVContent,
  CSVRow,
  CSVRowOptions,
} from 'server/controller/cycleData/bulkDownload/types'

import { getCSVRow } from './_row'
import { getCSVRowHeader } from './_rowHeader'

type Props = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
  data: BulkDownloadData
  file: BulkDownloadFile
  i18n: i18nType
  metadata: BulkDownloadMetadata
}

// returns the CSV content for the BulkDownloadFile object
export const getCSVContentFile = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, file, i18n, metadata } = props
  const { colForestArea } = metadata
  const { csvPostProcessor, fileName, includeClimaticDomain, includeDeskStudy, includeFlag, includeForestArea, rows } =
    file

  const baseOptions = {
    colForestArea: includeForestArea ? colForestArea : undefined,
    includeClimaticDomain,
    includeDeskStudy,
    includeFlag,
  }
  const csvRows: Array<CSVRow> = []

  const { colNodes, colYear } = rows.at(0)
  const optionsHeader: CSVRowOptions = { ...baseOptions, colNodes, colYear }
  const rowHeader = getCSVRowHeader({ i18n, options: optionsHeader })
  csvRows.push(rowHeader)

  countries.forEach((country) => {
    rows.forEach((row) => {
      const { colNodes, colYear } = row
      const options = { ...baseOptions, colNodes, colYear }
      const csvRow = getCSVRow({ assessment, country, cycle, data, i18n, options })
      csvRows.push(csvRow)
    })
  })

  csvPostProcessor?.({ rows: csvRows })

  if (includeFlag) {
    const legendEntries = [
      i18n.t('bulkDownload.flag.legend'),
      i18n.t('bulkDownload.flag.A'),
      i18n.t('bulkDownload.flag.I'),
      i18n.t('bulkDownload.flag.M'),
      i18n.t('bulkDownload.flag.O'),
    ]

    legendEntries.forEach((entry, index) => {
      csvRows.at(index).push(`"${entry}"`)
    })
  }

  return {
    content: csvRows.join(`\n`),
    fileName: `${fileName}_${Dates.format(new Date(), 'yyyy-MM-dd')}.csv`,
  }
}
