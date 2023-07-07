import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

type Variable = {
  name: string
  labelKey: string
}

const variables: Array<Variable> = [
  { name: 'bamboo', labelKey: 'bamboo' },
  { name: 'mangroves', labelKey: 'mangroves' },
  { name: 'rubber_wood', labelKey: 'rubberWood' },
]

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  const getValidations = (variable: Variable, index: number): string => {
    const { name } = variable
    const categoryValues = variables.map(({ name }) => `specificForestCategories.${name}`).join(',')
    const categoryLabels = variables.map(({ labelKey }) => `''specificForestCategories.${labelKey}''`).join(',')

    return `[
  "validatorNotGreaterThanForest(extentOfForest.forestArea, specificForestCategories.${name})",
  "validatorSumSubCategoriesNotGreaterThanParent(extentOfForest.forestArea,''extentOfForest.forestArea'',''1a'',[${categoryValues}],[${categoryLabels}],${index})"
]`
  }

  await client.query(
    variables.map(
      (variable, index) => `update ${schemaAssessment}.row r
set props = jsonb_set(props, '{validateFns,${cycle.uuid}}', '${getValidations(variable, index)}')
from (select r2.id
      from ${schemaAssessment}.row r2
               left join ${schemaAssessment}."table" t on r2.table_id = t.id
      where t.props ->> 'name' = 'specificForestCategories'
        and r2.props ->> 'variableName' = '${variable.name}') r2
where r.id = r2.id;
`
    ).join(`
  `)
  )

  await AssessmentController.generateMetaCache({ assessment, cycle }, client)
}
