import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const tableName = 'climaticDomain'
const variableSet = ['boreal', 'temperate', 'sub_tropical', 'tropical']

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  const getValidations = (variable: string, index: number) => {
    const keys: Record<string, string> = { sub_tropical: 'subtropical' }
    const categoryValues = `[${variableSet.map((v) => `climaticDomain.${v}`).join(',')}]`
    const categoryLabels = `[${variableSet.map((v) => `''climaticDomain.${keys[v] ?? v}''`).join(',')}]`

    return `[
              "validatorNotGreaterThan(climaticDomain.${variable}, 100)",
              "validatorSumEqualTo(${categoryValues}, ${categoryLabels}, 100, ${index})"
            ]`
  }

  await client.query(
    variableSet.map(
      (variable, index) => `
      update ${schemaAssessment}.row r
      set props = jsonb_set(props, '{validateFns,${cycle.uuid}}', '${getValidations(variable, index)}')
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
