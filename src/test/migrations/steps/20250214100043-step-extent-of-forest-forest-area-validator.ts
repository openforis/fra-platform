import { AssessmentNames, TableNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'

const tableName = TableNames.extentOfForest
const variableName = 'forestArea'
const fn =
  "validatorEqualToPreviousCycleForestArea(fra['$prevCycle'].extentOfForest.forestArea, extentOfForest.forestArea)"

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  const cycles = assessment.cycles.filter((cycle) => cycle.name !== '2020')

  const row = await RowRepository.getOne({ assessment, tableName, variableName }, client)
  cycles.forEach((cycle) => {
    const validateFns = row.props.validateFns[cycle.uuid]
    const targetIndex = validateFns.findIndex((fn) => fn.includes('validatorEqualToPreviousCycleForestArea'))
    validateFns[targetIndex] = fn
  })

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`update ${schemaAssessment}.row set props = $1 where id = $2`, [JSON.stringify(row.props), row.id])
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
