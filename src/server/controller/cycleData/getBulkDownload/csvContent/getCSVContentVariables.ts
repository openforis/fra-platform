import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { toCSVContent } from 'server/controller/cycleData/getBulkDownload/csvContent/_toContent'
import {
  BulkDownloadColNode,
  BulkDownloadData,
  BulkDownloadYear,
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
  i18n: i18nType
  includeClimaticDomain?: boolean
  yearMeta: BulkDownloadYear
}

// multiple variables per row
/**
 * @deprecated
 * only getCSVContentFile will be used
 */
export const getCSVContentVariables = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, i18n, includeClimaticDomain, yearMeta } = props
  const { fileName, includeDeskStudy = true, tables, years } = yearMeta

  const colValues: Array<BulkDownloadColNode> = tables.flatMap((table) => {
    const { getDatum, tableName } = table
    return table.variables.flatMap((variable) => {
      const { colName, csvColumn, type, variableName } = variable
      return { colName, csvColumn, getDatum, tableName, type, variableName }
    })
  })

  const rows: Array<CSVRow> = []

  const optionsHeader: CSVRowOptions = { colNodes: colValues, includeClimaticDomain, includeDeskStudy, colYear: 'year' }
  const rowHeader = getCSVRowHeader({ options: optionsHeader })
  rows.push(rowHeader)

  countries.forEach((country) => {
    years.forEach((colYear) => {
      const colValuesRow = colValues.map<BulkDownloadColNode>((colValue) => {
        return { ...colValue, colName: colValue.colName ?? colYear }
      })
      const options: CSVRowOptions = { ...optionsHeader, colNodes: colValuesRow, colYear }
      const row = getCSVRow({ assessment, country, cycle, data, i18n, options })

      rows.push(row)
    })
  })

  return toCSVContent({ fileName, rows })
}
