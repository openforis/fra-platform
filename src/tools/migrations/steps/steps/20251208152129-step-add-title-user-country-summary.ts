import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db/db'
import { getCreateOrReplaceViewCountryUserSummary } from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { Schemas } from 'server/db/schemas'

export default async (): Promise<void> => {
  const assessments = await AssessmentController.getAll({})
  await Promise.all(
    assessments.map((assessment) => {
      return Promise.all(
        assessment.cycles.map(async (cycle) => {
          const schemaCycle = Schemas.getSchemaAssessmentCycle({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
          })
          await DB.none(`drop view if exists ${schemaCycle}.country_user_summary;`)
          return DB.none(getCreateOrReplaceViewCountryUserSummary({ assessment, cycle }))
        })
      )
    })
  )
}
