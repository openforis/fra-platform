import { TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { updateCalculatedVariable } from 'test/migrations/steps/utils/updateCalculatedVariable'

const sectionName = TableNames.forestCharacteristics
const tableName = 'primaryForestByClimaticDomain'
const variableTotal = 'totalPrimaryForest'
const variables = ['primaryForestBoreal', 'primaryForestTemperate', 'primaryForestSubTropical', 'primaryForestTropical']

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  const categoryValues = `[${variables.map((v) => `${tableName}.${v}`).join(', ')}]`
  const categoryLabelKeys = `[${variables.map((v) => `''fra.${tableName}.${v}''`).join(', ')}]`
  const validator = `validatorSumSubCategoriesNotEqualToParent(forestCharacteristics.totalForestArea,''fra.primaryForestByClimaticDomain.totalPrimaryForest'', ''1b'', ${categoryValues}, ${categoryLabelKeys} )`
  // update total calculation formula
  await client.query(`
      update ${schemaAssessment}.row r
      set props = jsonb_set(r.props, '{calculateFn,"${cycle.uuid}"}',
                            '"forestCharacteristics.totalForestArea"',
                            true) ||
                  jsonb_build_object('validateFns',
                                     jsonb_build_object('${cycle.uuid}', jsonb_build_array('${validator}')))
      from (select r.id,
                   r.props ->> 'variableName' as variable_name,
                   r.props,
                   t.props ->> 'name'
            from ${schemaAssessment}.row r
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' = '${tableName}'
              and r.props ->> 'variableName' = '${variableTotal}') as r2
      where r.id = r2.id;`)

  // update other variables calculation formula
  await Promise.all(
    variables.map((variableName) => {
      const sumVariables = `${variables
        // .filter((v) => v !== variableName)
        .map((v) => `Number(primaryForestByClimaticDomain.${v} || 0)`)
        .join(` + `)}`
      const formula = `!primaryForestByClimaticDomain.${variableName} && equalsWithTolerance((${sumVariables}), forestCharacteristics.totalForestArea)`

      return client.query(`
          update ${schemaAssessment}.row r
          set props = jsonb_set(r.props, '{calculateFn}',
                                jsonb_build_object('${cycle.uuid}', '0'),
                                true) || jsonb_build_object('readonly', false) ||
                      jsonb_build_object('calculateIf', jsonb_build_object('${cycle.uuid}', '${formula}'))
          from (select r.id,
                       r.props ->> 'variableName' as variable_name,
                       r.props,
                       t.props ->> 'name'
                from ${schemaAssessment}.row r
                         left join ${schemaAssessment}."table" t on t.id = r.table_id
                where t.props ->> 'name' = '${tableName}'
                  and r.props ->> 'variableName' = '${variableName}') as r2
          where r.id = r2.id;`)
    })
  )

  await AssessmentController.generateMetaCache({ assessment, cycle }, client)

  await updateCalculatedVariable({ assessment, cycle, sectionName, tableName, variableName: variableTotal }, client)
  for (let i = 0; i < variables.length; i += 1) {
    const variableName = variables[i]
    // eslint-disable-next-line no-await-in-loop
    await updateCalculatedVariable({ assessment, cycle, sectionName, tableName, variableName }, client)
  }
}
