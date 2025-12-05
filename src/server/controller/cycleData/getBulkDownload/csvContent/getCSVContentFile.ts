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
import { CSVColValue, CSVRowOptions } from './_types'

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

// retrieves the CSV content for the generic BulkDownloadFile object
export const getCSVContentFile = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, descriptions, file, i18n, metadata } = props
  const { colForestArea } = metadata
  const { colDescriptions, colNodes, fileName, includeClimaticDomain, includeForestArea } = file

  const colValues = colNodes.map<CSVColValue>((column) => {
    const { colName, csvColumn = column.colName, getDatum, tableName, type, variableName } = column
    return { colName, csvColumn, getDatum, tableName, type, variableName }
  })

  const options: CSVRowOptions = {
    colForestArea: includeForestArea ? colForestArea : undefined,
    colDescriptions,
    colValues,
    includeClimaticDomain,
  }

  const rows: Array<CSVRow> = []

  const rowHeader = getCSVRowHeader({ options })
  rows.push(rowHeader)

  countries.forEach((country) => {
    const row = getCSVRow({ assessment, country, cycle, data, descriptions, i18n, options })
    rows.push(row)
  })

  return toCSVContent({ fileName, rows })
}
