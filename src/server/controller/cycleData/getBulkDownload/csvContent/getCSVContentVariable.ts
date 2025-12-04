import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'

import { getFileName } from 'server/controller/cycleData/getBulkDownload/csvContent/_fileName'
import {
  BulkDownloadTable,
  BulkDownloadVariable,
  BulkDownloadYear,
  CSVContent,
  CSVRow,
} from 'server/controller/cycleData/getBulkDownload/types'

import { getCSVRow } from './_row'
import { getCSVRowHeader } from './_rowHeader'
import { CSVColValue, CSVRowHeaderOptionsVariable } from './_types'

type Props = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
  data: RecordAssessmentData
  i18n: i18nType
  includeClimaticDomain?: boolean
  yearMeta: BulkDownloadYear
  table: BulkDownloadTable
  variable: BulkDownloadVariable
}

// single variable file
export const getCSVContentVariable = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, i18n, includeClimaticDomain, table, variable, yearMeta } = props
  const { fileName, years } = yearMeta
  const { getDatum, tableName } = table
  const { colName, type, variableName } = variable

  const colValues: Array<CSVColValue> = years.map((year) => {
    return { colName: colName ?? year, csvColumn: year.replace('_', '-'), getDatum, tableName, type, variableName }
  })

  const rows: Array<CSVRow> = []

  const options: CSVRowHeaderOptionsVariable = { colValues, includeClimaticDomain }
  const rowHeader = getCSVRowHeader({ options })
  rows.push(rowHeader)

  countries.forEach((country) => {
    const row = getCSVRow({ assessment, country, cycle, data, i18n, options })

    rows.push(row)
  })

  return {
    content: rows.join('\n'),
    fileName: getFileName({ fileName: `${fileName}_variables/${variable.csvColumn}` }),
  }
}
