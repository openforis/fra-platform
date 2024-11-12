import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { getCreateOrReplaceViewCountryUserSummary } from 'server/repository/assessment/assessment/getCreateSchemaDDL'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map(async (cycle) => {
          await client.none(
            `create index if not exists users_invitation_user_lookup_idx on public.users_invitation(user_uuid, cycle_uuid, assessment_uuid);`
          )
          await client.none(
            `create index if not exists users_role_user_lookup_idx on public.users_role(user_uuid, cycle_uuid, assessment_uuid, role);`
          )

          await client.query(getCreateOrReplaceViewCountryUserSummary({ assessment, cycle }))
        })
      )
    )
  )
}
