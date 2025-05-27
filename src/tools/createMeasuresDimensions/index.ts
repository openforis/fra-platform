import 'tsconfig-paths/register'
import 'dotenv/config'

import * as pgPromise from 'pg-promise'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Objects } from 'utils/objects'

import { AssessmentNames } from 'meta/assessment/assessment'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { Measures } from 'meta/measurement/measures'
import { SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { SystemOfMeasurementRepository } from 'server/repository/measurement/systemOfMeasurement'

const areaBasedTables = [
  'areaAffectedByFire',
  'areaOfPermanentForestEstate',
  'disturbances',
  'extentOfForest',
  'forestAreaWithinProtectedAreas',
  'forestCharacteristics',
  'forestOwnership',
  'holderOfManagementRights',
  'otherLandWithTreeCover',
  'primaryDesignatedManagementObjective',
  'specificForestCategories',
  'sustainableDevelopment15_2_1_5',
  'totalAreaWithDesignatedManagementObjective',
]

const client: BaseProtocol = DB

const createMeasuresDimensions = async () => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  const { uuid: areaSystemOfMeasurementUuid } = await SystemOfMeasurementRepository.getOne(
    { systemOfMeasurementName: SystemOfMeasurementName.area },
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
    [areaBasedTables],
    (res) => Objects.camelize(res)
  )

  const measures = variableNames.map(({ tableName, variableName }) => {
    const name = Measures.variableNameToMeasureName(tableName, variableName)
    return { name, system_uuid: areaSystemOfMeasurementUuid }
  })

  const pgp = pgPromise()
  const columns = [
    { name: 'name', prop: 'name' },
    { name: 'system_uuid', prop: 'system_uuid' },
  ]
  const table = { table: 'measure', schema: 'measurement' }
  const cs = new pgp.helpers.ColumnSet(columns, { table })

  const insertMeasures = `${pgp.helpers.insert(measures, cs)} on conflict (name) do nothing;`

  await client.query(insertMeasures)

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
    [areaBasedTables]
  )

  await CacheController.generateExplorerMetadata({ assessment, cycle }, client)
}

ToolsUtils.exec(createMeasuresDimensions)
