import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Labels } from 'meta/assessment/labels'
import { Table, TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Dates } from 'utils/dates'
import { Objects } from 'utils/objects'

import { getFileName } from 'server/controller/cycleData/getBulkDownload/csvContent/_fileName'
import {
  BulkDownloadMetadata,
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
  metadata: BulkDownloadMetadata
  table: BulkDownloadTable
  variable: BulkDownloadVariable
  yearMeta: BulkDownloadYear
}

/**
 * Retrieves the unit label path for a given table name and cycle.
 */
const getUnitLabel = (props: { cycle: Cycle; i18n: i18nType; table: Table }): string => {
  const { cycle, i18n, table } = props
  const { name: tableName, unit } = table.props

  const pathMap: Record<TableName, Array<string>> = {
    [TableNames.growingStockComposition2025]: ['1', 'cols', '0', 'props', 'labels', cycle.uuid],
    [TableNames.carbonStockSoilDepth]: ['0', 'cols', '0', 'props', 'labels', cycle.uuid],
  }

  // The unit label is found from the second column of the header row by default
  const path = pathMap[tableName] ?? ['0', 'cols', '1', 'props', 'labels', cycle.uuid]
  const label = Objects.getInPath(table.rows, path)
  return label ? i18n.t(Labels.getLabel({ label, t: i18n.t })) : i18n.t(`unit.${unit}`)
}

// single variable file
export const getCSVContentVariable = (props: Props): CSVContent => {
  const { assessment, countries, cycle, data, i18n, includeClimaticDomain, metadata, table, variable, yearMeta } = props
  const { forestArea, tables } = metadata
  const { fileName, years } = yearMeta
  const { getDatum, tableName } = table
  const { colName, colsVariable, type, variableName } = variable

  const colValues: Array<CSVColValue> = colsVariable
    ? colsVariable.map((colVariable) => {
        return {
          colName: colVariable.colName,
          csvColumn: colVariable.csvColumn ?? colVariable.colName,
          tableName,
          type,
          variableName,
        }
      })
    : years.map((year) => {
        return { colName: colName ?? year, csvColumn: year.replace('_', '-'), getDatum, tableName, type, variableName }
      })

  const rows: Array<CSVRow> = []

  const options: CSVRowHeaderOptionsVariable = { colValues, forestArea, includeClimaticDomain }
  const rowHeader = getCSVRowHeader({ options })
  rows.push(rowHeader)

  countries.forEach((country) => {
    const row = getCSVRow({ assessment, country, cycle, data, i18n, options })

    rows.push(row)
  })

  rows[0].push(`"${variable.csvColumn}"`)
  rows[1].push(`"${Dates.format(new Date(), 'dd/MM/yyyy')} (${i18n.t('bulkDownload.dateOfExport')})"`)
  rows[2].push(getUnitLabel({ cycle, i18n, table: tables[tableName] }))

  return {
    content: rows.join('\n'),
    fileName: getFileName({ fileName: `${fileName}_variables/${variable.csvColumn}` }),
  }
}
