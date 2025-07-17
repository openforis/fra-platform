import 'tsconfig-paths/register'
import 'dotenv/config'

import * as pgPromise from 'pg-promise'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Objects } from 'utils/objects'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { Dimensions } from 'meta/measurement/dimensions'
import { Measures } from 'meta/measurement/measures'
import { SystemOfMeasurementName, systemsOfMeasurement } from 'meta/measurement/systemOfMeasurement'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { SystemOfMeasurementRepository } from 'server/repository/measurement/systemOfMeasurement'

const client: BaseProtocol = DB

type Props = {
  assessment: Assessment
  systemOfMeasurementName: SystemOfMeasurementName | null // null -> no system of measurement
  tableNames: Array<TableName>
}

const _createMeasuresAndDimensionsForTables = async (props: Props) => {
  const { assessment, systemOfMeasurementName, tableNames } = props

  if (Objects.isEmpty(tableNames)) return

  const schemaAssessment = Schemas.getName(assessment)

  const systemOfMeasurementUuid = systemOfMeasurementName
    ? (await SystemOfMeasurementRepository.getOne({ systemOfMeasurementName }, client))?.uuid
    : null

  // 1. Migrate area based measures
  const variableNames = await client.map<{ tableName: TableName; variableName: VariableName }>(
    `
    select distinct t.props ->> 'name' as table_name, r.props ->> 'variableName' AS variable_name
    from ${schemaAssessment}.row r
    join ${schemaAssessment}."table" t
      on t.id = r.table_id
    where t.props ->> 'name' in ($1:csv)
      and r.props ->> 'variableName' is not null
      and r.props ->> 'variableName' <> ''
    `,
    [tableNames],
    (res) => Objects.camelize(res)
  )

  const measures = variableNames.map(({ tableName, variableName }) => {
    const name = Measures.variableNameToMeasureName(tableName, variableName)
    return { name, system_uuid: systemOfMeasurementUuid }
  })

  const pgp = pgPromise()
  const measureColumns = [
    { name: 'name', prop: 'name' },
    { name: 'system_uuid', prop: 'system_uuid' },
  ]
  const measureTable = { table: 'measure', schema: 'measurement' }
  const measuresColumnSet = new pgp.helpers.ColumnSet(measureColumns, { table: measureTable })

  const insertMeasuresQuery = `${pgp.helpers.insert(measures, measuresColumnSet)} on conflict (name) do nothing;`

  await client.query(insertMeasuresQuery)

  // 2. Migrate area based dimensions
  const dimensionNames = await client.map<{ tableName: TableName; columnName: ColName }>(
    `
    select distinct
      t.props ->> 'name' as table_name, dim.name as column_name
    from ${schemaAssessment}."table" t
    cross join lateral
      jsonb_each(t.props -> 'columnNames') as cn(cycle_uuid, names)
    cross join lateral
      jsonb_array_elements_text(cn.names) as dim(name)
    where t.props ->> 'name' in ($1:csv)
      and t.props -> 'columnNames' is not null
    
    union -- Include columnNames from cellsExportAlways

    select distinct
      t.props ->> 'name' as table_name, dim.name as column_name
    from ${schemaAssessment}."table" t
    cross join lateral (
      select elem ->> 'columnName' as name
      from jsonb_each(t.props -> 'cellsExportAlways') as cea(cycle_uuid, arr),
          jsonb_array_elements(cea.arr) as elem
    ) as dim
    where t.props ->> 'name' in ($1:csv)
      and (
        t.props -> 'columnNames' is not null
        or t.props -> 'cellsExportAlways' is not null
      )
  `,
    [tableNames],
    (res) => Objects.camelize(res)
  )
  const dimensions = dimensionNames.map(({ columnName, tableName }) => ({
    name: Dimensions.columnNameToDimensionName(tableName, columnName),
  }))

  const dimensionColumns = [{ name: 'name', prop: 'name' }]
  const dimensionTable = { table: 'dimension', schema: 'measurement' }
  const dimensionsColumnSet = new pgp.helpers.ColumnSet(dimensionColumns, { table: dimensionTable })

  const insertDimensionsQuery = `${pgp.helpers.insert(dimensions, dimensionsColumnSet)} on conflict (name) do nothing;`
  await client.query(insertDimensionsQuery)
}

const createAllMeasuresDimensions = async () => {
  const assessmentName = AssessmentNames.fra

  const { assessment, cycle: cycle2025 } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName: '2025' },
    client
  )
  const cycleLatest = assessment.cycles.find((c) => c.name === 'latest')

  const systemEntries = Object.entries(systemsOfMeasurement)

  await Promise.all([
    ...systemEntries.map(([systemOfMeasurementName, config]) => {
      const { tableNames } = config
      return _createMeasuresAndDimensionsForTables({
        assessment,
        systemOfMeasurementName: systemOfMeasurementName as SystemOfMeasurementName,
        tableNames,
      })
    }),
    _createMeasuresAndDimensionsForTables({
      assessment,
      systemOfMeasurementName: null,
      tableNames: ['growingStockComposition2025'],
    }),
    _createMeasuresAndDimensionsForTables({
      assessment,
      systemOfMeasurementName: null,
      tableNames: ['forestPolicy'],
    }),
  ])

  await CacheController.generateExplorerMetadata({ assessment, cycle: cycle2025 }, client)
  await CacheController.generateExplorerMetadata({ assessment, cycle: cycleLatest }, client)
}

ToolsUtils.exec(createAllMeasuresDimensions)
