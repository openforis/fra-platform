import { Objects } from 'utils/objects'

import { AssessmentNames, ColName, ColProps, ColType, SectionName, TableName, VariableName } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { DataRedisRepository } from 'server/repository/redis/data'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

const assessmentName = AssessmentNames.panEuropean
const cycleName = '2025'
const tableName = 'table_1_2c'
const tableName2020 = `${tableName}_2020`

type Result = {
  sectionName: SectionName
  tableName: TableName
  tableId: number
  rowUuid: string
  variableName: VariableName
  colName: ColName
  colId: number
  colUuid: string
  colProps: ColProps
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const schemaAssessment = Schemas.getName(assessment)
  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')
  const schemaCycle2020 = Schemas.getNameCycle(assessment, cycle2020)
  const schemaCycle2025 = Schemas.getNameCycle(assessment, cycle)

  // 1. fix unique table name
  const res = await client.oneOrNone<{ id: number }>(`
      update ${schemaAssessment}."table" t
      set props = jsonb_set(t.props, '{name}', '"${tableName2020}"')
      from (select t2.id
            from ${schemaAssessment}."table" t2
                     left join ${schemaAssessment}.table_section ts on t2.table_section_id = ts.id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = 'growingStockComposition'
              and t2.props ->> 'name' = '${tableName}') as src
      where t.id = src.id
      returning t.id;`)

  if (res) {
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
  }

  // -- 3. generate table 2020 view and drop old view
  const table = await MetadataController.getTable({ assessment, cycle: cycle2020, tableName: tableName2020 }, client)
  await DataRepository.createOrReplaceTableDataView({ assessment, cycle: cycle2020, table })
  await DB.query(`drop view if exists ${schemaCycle2020}.${tableName}`)

  // 4. delete all validations
  const results = await client.map<Result>(
    `
        update ${schemaAssessment}.col c
        set props = src.col_props
        from (select s.props ->> 'name'                          as section_name
                   , t.props ->> 'name'                          as table_name
                   , t.id                                        as table_id
                   , r.uuid                                      as row_uuid
                   , r.props ->> 'variableName'                  as variable_name
                   , c.props ->> 'colName'                       as col_name
                   , c.id                                        as col_id
                   , c.uuid                                      as col_uuid
                   , c.props
                   , jsonb_delete_path(c.props, '{validateFns}') as col_props
--            , t.props ->> 'cycles'
                   , r.props ->> 'validateFns'                   as row_validations
                   , c.props ->> 'validateFns'                   as col_validations
              from ${schemaAssessment}.col c
                       left join ${schemaAssessment}.row r on r.id = c.row_id
                       left join ${schemaAssessment}."table" t on t.id = r.table_id
                       left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                       left join ${schemaAssessment}.section s on s.id = ts.section_id
              where s.props ->> 'name' = 'growingStock'
                and t.props ->> 'name' = 'table_1_2c'
                and r.props ->> 'variableName' is not null
                and c.props ->> 'colName' is not null
              order by 1, 2, 3, 4, 5) as src
        where c.id = src.col_id
        returning src.section_name, src.table_name, src.table_id, src.row_uuid, src.variable_name, src.col_name, src.col_id, src.col_uuid, c.props as col_props;
    `,
    [],
    (res) => Objects.camelize(res)
  )

  // 5. update total type, calculation and validations
  const totals = results
    .filter((r) => r.variableName === 'total')
    .map<Result>((r) => {
      const colNameSplit = r.colName.split('_')
      const year = colNameSplit[colNameSplit.length - 1]
      const arrayVars = Array.from({ length: 10 }).map(
        (_, i) => `table_1_2c.no${i + 1}_ranked_in_terms_of_volume.${r.colName}`
      )
      arrayVars.push(`table_1_2c.remaining.${r.colName}`)

      const calcFnCondition = arrayVars.join(` || `)
      const calcFnFormula = arrayVars.map((v) => `(${v} || 0)`).join(` + `)

      return {
        ...r,
        colProps: {
          ...r.colProps,
          colType: ColType.calculated,
          calculateFn: {
            [cycle.uuid]: `(${calcFnCondition}) ? (${calcFnFormula}) : null`,
          },
          validateFns: {
            [cycle.uuid]: [
              `validatorSumSubCategoriesNotEqualToParent(table_1_2a.forest_${year}.total,''panEuropean.growingStock.forest'',''1.2 I'',[${arrayVars.join(
                ', '
              )}],[''panEuropean.growingStockComposition.noShort_ranked_in_terms_of_volume'',''panEuropean.growingStockComposition.remaining''], ''{"year":"${year}"}'')`,
            ],
          },
        },
      }
    })
  await client.query(
    totals.map(
      (t) => `
          update ${schemaAssessment}.col c
          set props = '${JSON.stringify(t.colProps)}'::jsonb
          where id = ${t.colId}
      `
    ).join(`;
  `)
  )

  // 6. update metacache and metadata cache
  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)

  // 7. delete old values
  await client.query(
    totals.map(
      (t) => `
          delete
          from ${schemaCycle2025}.node n
          where n.row_uuid = '${t.rowUuid}'
            and n.col_uuid = '${t.colUuid}'
      `
    ).join(`;
`)
  )
  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)
  await DataRedisRepository.getCountriesData(
    { assessment, cycle, countryISOs, tables: { table_1_2c: {} }, force: true },
    client
  )

  // 8. update calculated total
  const update = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache: true }, client)
  const nodes = totals.map<NodeUpdate>(({ tableName, variableName, colName }) => ({
    tableName,
    variableName,
    colName,
    value: { raw: undefined },
  }))
  await updateDependencies(
    {
      assessment: update.assessment,
      cycle: update.cycle,
      includeSourceNodes: true,
      nodes,
    },
    client
  )
}
