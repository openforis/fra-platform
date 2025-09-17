import '../scriptInit'

import * as fs from 'node:fs'
import * as path from 'node:path'
import * as pgPromise from 'pg-promise'
import { TotalLandAreaUpdateData, updateTotalLandArea } from 'tools/migrations/steps/steps/utils/updateTotalLandArea'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment/node'
import { NodeExtType } from 'meta/nodeExt'

import { UserController } from 'server/controller/user'
import { BaseProtocol, DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const totalLandAreaFile = 'total_land_area.csv' as const

const pgp = pgPromise()

const columns = ['country_iso', { name: 'props', cast: 'jsonb' }, { name: 'value', cast: 'jsonb' }, 'type']
const assessmentName = 'fra'
const cycleName = '2025'
const schema = `assessment_${assessmentName}_${cycleName}`
const table = { table: 'node_ext', schema }
const cs = new pgp.helpers.ColumnSet(columns, { table })

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
  value: NodeValue
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

  const _getValue = (value: string): NodeValue => {
    const raw = Objects.isEmpty(value) ? null : value
    const obj: NodeValue = { raw }

    const faoEstimate = variableName !== 'totalLandArea'
    if (faoEstimate) {
      obj.faoEstimate = true
    }
    return obj
  }

  return Object.entries(yearData).map(([colName, value]) => ({
    // eslint-disable-next-line camelcase
    country_iso,
    props: { colName, tableName, variableName },
    value: _getValue(value),
    type: NodeExtType.node,
  }))
}

const _getValues = async (fileNames: Array<string>): Promise<Array<ValueType>> => {
  const csvDataArrays = await Promise.all(fileNames.map(_readCSV))
  return csvDataArrays.flat().flatMap(_handleRow)
}

const _writeDb = async (values: Array<ValueType>, client: BaseProtocol): Promise<void> => {
  const query = pgp.helpers.insert(values, cs)
  await client.query(query)

  Logger.info(`Inserted ${values.length} records into database`)
}

const _totalLandArea = async (client: BaseProtocol): Promise<void> => {
  const values = await _getValues([totalLandAreaFile])

  const user = await UserController.getUserRobot(client)
  const data = values.reduce<TotalLandAreaUpdateData>((acc, valueType) => {
    // eslint-disable-next-line camelcase
    const { country_iso, props, value } = valueType
    // eslint-disable-next-line camelcase
    const countryIso = country_iso as CountryIso
    if (!acc[countryIso]) acc[countryIso] = []
    acc[countryIso].push({ year: Number(props.colName), value: Number(value.raw) })
    return acc
  }, {})

  await updateTotalLandArea({ cycleName, data, user }, client)
}

const processCSVFiles = async (): Promise<void> => {
  // Inset new values
  const fileNames = _getFileNames().filter((n) => n !== totalLandAreaFile)
  const values = await _getValues(fileNames)

  await DB.tx(async (client) => {
    await _writeDb(values, client)

    // Update total land area values
    await _totalLandArea(client)
  })
}

ToolsUtils.exec(processCSVFiles)
