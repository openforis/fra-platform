import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'

import { toCSVContent } from 'server/controller/cycleData/getBulkDownload/csvContent/_toContent'
import {
  BulkDownloadData,
  BulkDownloadFile,
  BulkDownloadMetadata,
  CSVContent,
  CSVRow,
} from 'server/controller/cycleData/getBulkDownload/types'

import { getCSVRow } from './_row'
import { getCSVRowHeader } from './_rowHeader'
import { CSVRowOptions } from './_types'

type Props = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
  data: BulkDownloadData
  descriptions: DescriptionCountryValues
  file: BulkDownloadFile
  metadata: BulkDownloadMetadata
  i18n: i18nType
}

// returns the CSV content for the BulkDownloadFile object
export const getCSVContentFile = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, descriptions, file, i18n, metadata } = props
  const { colForestArea } = metadata
  const { csvPostProcessor, fileName, includeClimaticDomain, includeDeskStudy, includeForestArea, rows } = file

  const baseOptions = {
    colForestArea: includeForestArea ? colForestArea : undefined,
    includeClimaticDomain,
    includeDeskStudy,
  }
  const csvRows: Array<CSVRow> = []

  const { colDescriptions, colNodes, colYear } = rows.at(0)
  const optionsHeader: CSVRowOptions = { ...baseOptions, colDescriptions, colNodes, colYear }
  const rowHeader = getCSVRowHeader({ options: optionsHeader })
  csvRows.push(rowHeader)

  countries.forEach((country) => {
    rows.forEach((row) => {
      const { colDescriptions, colNodes, colYear } = row
      const options = { ...baseOptions, colDescriptions, colNodes, colYear }
      const csvRow = getCSVRow({ assessment, country, cycle, data, descriptions, i18n, options })
      csvRows.push(csvRow)
    })
  })

  csvPostProcessor?.({ rows: csvRows })

  return toCSVContent({ fileName, rows: csvRows })
}
