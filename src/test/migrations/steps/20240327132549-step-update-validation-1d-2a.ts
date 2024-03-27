import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const _variables: Array<{ tableName: string; variables: string[]; parent: string }> = [
  {
    tableName: 'forestAreaChange',
    variables: ['afforestation', 'natural_expansion'],
    parent: 'forest_expansion',
  },
  {
    tableName: 'growingStockTotal',
    variables: ['plantationForest', 'otherPlantedForest'],
    parent: 'plantedForest',
  },
]

const assessmentName = AssessmentNames.fra
const cycleName = '2025'
export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const schemaAssessment = Schemas.getName(assessment)

  await Promises.each(_variables, async ({ tableName, variables, parent }) => {
    await Promises.each(variables, async (variable) => {
      await client.query(`
          update ${schemaAssessment}.row r
          set props = jsonb_set(r.props, '{validateFns,${cycle.uuid}}', src.validate_fns, true) from (
          select r.id
                , coalesce(r.props -> 'validateFns' -> '${cycle.uuid}', jsonb_build_array()) ||
                  jsonb_build_array(
                          'validatorSubCategory(' ||  (t.props ->> 'name') || '.' || '${parent}'|| ', '|| '[' || (t.props ->> 'name') || '.' || (r.props ->> 'variableName')  || '])'
                  ) as validate_fns
          from ${schemaAssessment}.row r
                  left join ${schemaAssessment}."table" t on t.id = r.table_id
                  where t.props ->> 'name'='${tableName}'
                  and r.props ->> 'variableName'='${variable}') as src
              where r.id = src.id;
    `)
    })
  })

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
