import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'

import { toCSVContent } from 'server/controller/cycleData/getBulkDownload/csvContent/_toContent'
import { BulkDownloadYear, CSVContent, CSVRow } from 'server/controller/cycleData/getBulkDownload/types'

import { getCSVRow } from './_row'
import { getCSVRowHeader } from './_rowHeader'
import { CSVColValue, CSVRowOptions } from './_types'

type Props = {
  assessment: Assessment
  countries: Array<Country>
  cycle: Cycle
  data: RecordAssessmentData
  i18n: i18nType
  includeClimaticDomain?: boolean
  yearMeta: BulkDownloadYear
}

// multiple variables per row
export const getCSVContentVariables = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, i18n, includeClimaticDomain, yearMeta } = props
  const { fileName, includeDeskStudy = true, tables, years } = yearMeta

  const colValues: Array<CSVColValue> = tables.flatMap((table) => {
    const { getDatum, tableName } = table
    return table.variables.flatMap((variable) => {
      const { colName, csvColumn, type, variableName } = variable
      return { colName, csvColumn, getDatum, tableName, type, variableName }
    })
  })

  const rows: Array<CSVRow> = []

  const optionsHeader: CSVRowOptions = { colValues, includeClimaticDomain, includeDeskStudy, year: 'year' }
  const rowHeader = getCSVRowHeader({ options: optionsHeader })
  rows.push(rowHeader)

  countries.forEach((country) => {
    years.forEach((year) => {
      const colValuesRow = colValues.map<CSVColValue>((colValue) => {
        return { ...colValue, colName: colValue.colName ?? year }
      })
      const options: CSVRowOptions = { ...optionsHeader, colValues: colValuesRow, year }
      const row = getCSVRow({ assessment, country, cycle, data, i18n, options })

      rows.push(row)
    })
  })

  return toCSVContent({ fileName, rows })
}
