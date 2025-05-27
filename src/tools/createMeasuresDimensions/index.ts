import 'tsconfig-paths/register'
import 'dotenv/config'

import * as pgPromise from 'pg-promise'
import { systemsOfMeasurement } from 'tools/migrations/public/steps/data/systemsOfMeasurement'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Objects } from 'utils/objects'

import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { Measures } from 'meta/measurement/measures'
import { SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { SystemOfMeasurementRepository } from 'server/repository/measurement/systemOfMeasurement'

const client: BaseProtocol = DB

type Props = {
  assessment: Assessment
  systemOfMeasurementName: SystemOfMeasurementName
  tableNames: Array<TableName>
}

const _createMeasuresAndDimensionsForTables = async (props: Props) => {
  const { assessment, systemOfMeasurementName, tableNames } = props

  const schemaAssessment = Schemas.getName(assessment)

  const { uuid: systemOfMeasurementUuid } = await SystemOfMeasurementRepository.getOne(
    { systemOfMeasurementName },
    client
  )

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
  const columns = [
    { name: 'name', prop: 'name' },
    { name: 'system_uuid', prop: 'system_uuid' },
  ]
  const table = { table: 'measure', schema: 'measurement' }
  const cs = new pgp.helpers.ColumnSet(columns, { table })

  const insertMeasuresQuery = `${pgp.helpers.insert(measures, cs)} on conflict (name) do nothing;`

  await client.query(insertMeasuresQuery)

  // 2. Migrate area based dimensions
  await client.query(
    `
    insert into measurement.dimension (name)
    select distinct
      dim.name
    from ${schemaAssessment}."table" t
    cross join lateral
      jsonb_each(t.props -> 'columnNames') as cn(cycle_uuid, names)
    cross join lateral
      jsonb_array_elements_text(cn.names) as dim(name)
    where t.props ->> 'name' in ($1:csv)
      and t.props -> 'columnNames' is not null
    on conflict (name) do nothing;
    `,
    [tableNames]
  )
}

const createAllMeasuresDimensions = async () => {
  const assessmentName = AssessmentNames.fra
  const cycleName = '2025'
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const systemEntries = Object.entries(systemsOfMeasurement)

  await Promise.all(
    systemEntries.map(async ([systemOfMeasurementName, config]) => {
      const { tableNames } = config
      await _createMeasuresAndDimensionsForTables({
        assessment,
        systemOfMeasurementName: systemOfMeasurementName as SystemOfMeasurementName,
        tableNames,
      })
    })
  )

  await CacheController.generateExplorerMetadata({ assessment, cycle }, client)
}

ToolsUtils.exec(createAllMeasuresDimensions)
