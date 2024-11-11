import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { getCreateOrReplaceViewCountryUserSummary } from 'server/repository/assessment/assessment/getCreateSchemaDDL'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map(async (cycle) => {
          await client.query(getCreateOrReplaceViewCountryUserSummary({ assessment, cycle }))
        })
      )
    )
  )
}
