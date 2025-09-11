import '../scriptInit'

import * as fs from 'node:fs'
import * as path from 'node:path'
import * as pgPromise from 'pg-promise'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { NodeExtType } from 'meta/nodeExt'

import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

type CSVData = {
  country_iso: CountryIso
  table_name: string
  variable_name: string
} & Record<string, string>

type ValueType = {
  country_iso: string
  props: {
    colName: string
    tableName: string
    variableName: string
  }
  value: {
    raw: string
    faoEstimate: boolean
  }
  type: NodeExtType
}

const _getFileNames = (): Array<string> => {
  const csvDir = path.join(__dirname, 'csv')
  const files = fs.readdirSync(csvDir)
  return files.filter((file) => file.endsWith('.csv'))
}

const _readCSV = async (fileName: string): Promise<Array<CSVData>> => {
  const csvPath = path.join(__dirname, 'csv', fileName)
  return CSV.read<CSVData>(csvPath)
}

const _handleRow = (row: CSVData): Array<ValueType> => {
  // eslint-disable-next-line camelcase
  const { country_iso, table_name: tableName, variable_name: variableName, ...yearData } = row

  // Filter out rows with empty country_iso
  if (Objects.isEmpty(country_iso)) {
    return []
  }

  // Ignore country values for given variable if any of the values are empty.
  // These variables are omitted from regional sums - so we don't insert them in the database
  const anyEmpty = Object.values(yearData).some((a) => Objects.isEmpty(a))

  if (anyEmpty) {
    return []
  }

  return Object.entries(yearData).map(([colName, raw]) => ({
    // eslint-disable-next-line camelcase
    country_iso,
    props: { colName, tableName, variableName },
    value: { raw: Objects.isEmpty(raw) ? null : raw, faoEstimate: true },
    type: NodeExtType.node,
  }))
}

const _getValues = async (fileNames: Array<string>): Promise<Array<ValueType>> => {
  const csvDataArrays = await Promise.all(fileNames.map(_readCSV))
  return csvDataArrays.flat().flatMap(_handleRow)
}

const _writeDb = async (values: Array<ValueType>): Promise<void> => {
  const pgp = pgPromise()
  const columns = ['country_iso', { name: 'props', cast: 'jsonb' }, { name: 'value', cast: 'jsonb' }, 'type']
  const table = { table: 'node_ext', schema: 'assessment_fra_2025' }
  const cs = new pgp.helpers.ColumnSet(columns, { table })

  const query = pgp.helpers.insert(values, cs)
  await DB.query(query)

  Logger.info(`Inserted ${values.length} records into database`)
}

const processCSVFiles = async (): Promise<void> => {
  const fileNames = _getFileNames()
  const values = await _getValues(fileNames)
  await _writeDb(values)
}

ToolsUtils.exec(processCSVFiles)
