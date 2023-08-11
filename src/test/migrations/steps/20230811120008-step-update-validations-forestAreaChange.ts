import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

type Variable = {
  name: string
  labelKey: string
}

const tableName = 'forestAreaChange'

const variableSet: Array<Variable> = [
  { name: 'afforestation', labelKey: 'ofWhichAfforestation' },
  { name: 'natural_expansion', labelKey: 'ofWhichNaturalExpansion' },
]

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  const getValidations = (
    functionName: string,
    variableSet: Array<Variable>,
    parentName: string,
    parentLabel: string,
    index: number
  ): string => {
    const categoryValues = variableSet.map(({ name }) => `${tableName}.${name}`).join(',')
    const categoryLabels = variableSet.map(({ labelKey }) => `''forestAreaChange.${labelKey}''`).join(',')

    return `[
  "${functionName}(${tableName}.${parentName}, ${parentLabel},''1d'',[${categoryValues}],[${categoryLabels}],${index})"
]`
  }

  const parentLabel = `''fra.forestAreaChange.forestExpansion2025''`
  const parentName = 'forest_expansion'
  const validateFn = 'validatorSumSubCategoriesNotEqualToParent'

  await client.query(
    variableSet.map(
      (variable, index) => `
      update ${schemaAssessment}.row r
      set props = jsonb_set(props, '{validateFns,${cycle.uuid}}', '${getValidations(
        validateFn,
        variableSet,
        parentName,
        parentLabel,
        index
      )}')
      from (select r2.id
            from ${schemaAssessment}.row r2
                     left join ${schemaAssessment}."table" t on r2.table_id = t.id
            where t.props ->> 'name' = '${tableName}'
              and r2.props ->> 'variableName' = '${variable.name}') r2
      where r.id = r2.id;`
    ).join(`
  `)
  )

  await AssessmentController.generateMetaCache({ assessment, cycle }, client)
}
