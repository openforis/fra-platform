import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'

import { toCSVContent } from 'server/controller/cycleData/getBulkDownload/csvContent/_toContent'
import { BulkDownloadFile, CSVContent, CSVRow } from 'server/controller/cycleData/getBulkDownload/types'

import { getCSVRow } from './_row'
import { getCSVRowHeader } from './_rowHeader'
import { CSVColValue, CSVRowOptions } from './_types'

type Props = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
  data: RecordAssessmentData
  file: BulkDownloadFile
  i18n: i18nType
  includeClimaticDomain?: boolean
}

// retries the CSV content for the generic BulkDownloadFile object
export const getCSVContentFile = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, file, i18n } = props
  const { columns, fileName } = file
  const includeClimaticDomain = file.includeClimaticDomain ? props.includeClimaticDomain : false

  const colValues = columns.map<CSVColValue>((column) => {
    const { colName, csvColumn = column.colName, tableName, type, variableName } = column
    return { colName, csvColumn, tableName, type, variableName }
  })

  const rows: Array<CSVRow> = []

  const options: CSVRowOptions = { colValues, includeClimaticDomain }
  const rowHeader = getCSVRowHeader({ options })
  rows.push(rowHeader)

  countries.forEach((country) => {
    const row = getCSVRow({ assessment, country, cycle, data, i18n, options })
    rows.push(row)
  })

  return toCSVContent({ fileName, rows })
}
