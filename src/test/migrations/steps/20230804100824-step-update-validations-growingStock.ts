import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

type Variable = {
  name: string
  labelKey: string
}

const tableName = 'growingStockTotal'

const variableSet1: Array<Variable> = [
  { name: 'naturallyRegeneratingForest', labelKey: 'naturallyRegeneratingForest' },
  { name: 'plantedForest', labelKey: 'plantedForest' },
]

const variableSet2 = ['plantationForest', 'otherPlantedForest']

const subCategoryEqualValidator = `[
  "validatorSubCategoryEqualToParent(growingStockTotal.plantedForest,[growingStockTotal.plantationForest,growingStockTotal.otherPlantedForest])"
]`

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  const getValidations = (index: number): string => {
    const categoryValues = variableSet1.map(({ name }) => `${tableName}.${name}`).join(',')
    const categoryLabels = variableSet1.map(({ labelKey }) => `''growingStock.${labelKey}''`).join(',')

    return `[
  "validatorSumSubCategoriesNotGreaterThanParent(${tableName}.forest,''fra.growingStock.totalForest'',''2a'',[${categoryValues}],[${categoryLabels}],${index})"
]`
  }

  await client.query(
    variableSet1.map(
      (variable, index) => `update ${schemaAssessment}.row r
set props = jsonb_set(props, '{validateFns,${cycle.uuid}}', '${getValidations(index)}')
from (select r2.id
      from ${schemaAssessment}.row r2
               left join ${schemaAssessment}."table" t on r2.table_id = t.id
      where t.props ->> 'name' = '${tableName}'
        and r2.props ->> 'variableName' = '${variable.name}') r2
where r.id = r2.id;`
    ).join(`
  `)
  )

  await client.query(
    variableSet2.map(
      (variable) => `update ${schemaAssessment}.row r
set props = jsonb_set(props, '{validateFns,${cycle.uuid}}', '${subCategoryEqualValidator}')
from (select r2.id
      from ${schemaAssessment}.row r2
               left join ${schemaAssessment}."table" t on r2.table_id = t.id
      where t.props ->> 'name' = '${tableName}'
        and r2.props ->> 'variableName' = '${variable}') r2
where r.id = r2.id;`
    ).join(`
  `)
  )

  await AssessmentController.generateMetaCache({ assessment, cycle }, client)
}
