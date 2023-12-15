import { AssessmentNames } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

const assessmentName = AssessmentNames.panEuropean
const metaCache = true
const tableName = 'table_4_2b'
const tableName2020 = `${tableName}_2020`

export default async (client: BaseProtocol) => {
  const panEu2020 = await AssessmentController.getOneWithCycle({ assessmentName, cycleName: '2020', metaCache }, client)
  const schemaAssessment = Schemas.getName(panEu2020.assessment)
  const schemaCycle2020 = Schemas.getNameCycle(panEu2020.assessment, panEu2020.cycle)

  // -- 1. fix unique table name
  const res = await client.one<{ id: number }>(`
      update ${schemaAssessment}."table" t
      set props = jsonb_set(t.props, '{name}', '"${tableName2020}"')
      from (select t2.id
            from ${schemaAssessment}."table" t2
                     left join ${schemaAssessment}.table_section ts on t2.table_section_id = ts.id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = 'annualForestExpansionAndRegeneration'
              and t2.props ->> 'name' = '${tableName}') as src
      where t.id = src.id
      returning t.id;`)

  // -- 2. fix unique row variable names
  await client.query(`
      update ${schemaAssessment}.row r
      set props = r.props || jsonb_build_object('variableName', src.variable_name)
      from (select r.id
                 , '_2020_' || (r.props ->> 'variableName') as variable_name
            from ${schemaAssessment}.row r
            where r.props ->> 'variableName' is not null
              and r.table_id = ${res.id}) as src
      where r.id = src.id
  `)
  const table = await MetadataController.getTable(
    { assessment: panEu2020.assessment, cycle: panEu2020.cycle, tableName: tableName2020 },
    client
  )

  // -- 3. generate table 2020 view and drop old view
  await DataRepository.createOrReplaceTableDataView({ assessment: panEu2020.assessment, cycle: panEu2020.cycle, table })
  await DB.query(`drop view if exists ${schemaCycle2020}.${tableName}`)

  // -- 4. update metacache
  await AssessmentController.generateMetaCache(client)

  // -- 5. update metadata cache
  await AssessmentController.generateMetadataCache({ assessment: panEu2020.assessment }, client)

  // -- 6. fix table 2025 calculated values
  const panEu2025 = await AssessmentController.getOneWithCycle({ assessmentName, cycleName: '2025', metaCache }, client)

  const nodes: Array<NodeUpdate> = [
    { value: { raw: null }, colName: 'afforestation', tableName, variableName: 'forest_2000' },
    { value: { raw: null }, colName: 'natural_expansion', tableName, variableName: 'forest_2000' },
    { value: { raw: null }, colName: 'afforestation', tableName, variableName: 'forest_2005' },
    { value: { raw: null }, colName: 'natural_expansion', tableName, variableName: 'forest_2005' },
    { value: { raw: null }, colName: 'afforestation', tableName, variableName: 'forest_2015' },
    { value: { raw: null }, colName: 'natural_expansion', tableName, variableName: 'forest_2015' },
    { value: { raw: null }, colName: 'afforestation', tableName, variableName: 'forest_2020' },
    { value: { raw: null }, colName: 'natural_expansion', tableName, variableName: 'forest_2020' },
    { value: { raw: null }, colName: 'afforestation', tableName, variableName: 'forest_2025' },
    { value: { raw: null }, colName: 'natural_expansion', tableName, variableName: 'forest_2025' },
  ]
  await updateDependencies(
    { assessment: panEu2025.assessment, cycle: panEu2025.cycle, nodes, includeSourceNodes: true },
    client
  )

  // -- 7. update data cache
  await AssessmentController.generateDataCache(
    { assessment: panEu2020.assessment, cycle: panEu2020.cycle, force: true },
    client
  )
  await AssessmentController.generateDataCache(
    { assessment: panEu2025.assessment, cycle: panEu2025.cycle, force: true },
    client
  )
}
