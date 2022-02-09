import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment, Cycle } from '@meta/assessment'
import { AssessmentRepository } from '@server/repository/assessment'

export const create = async (
  params: {
    assessment: Assessment
    name: string
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment, name } = params

  await DB.query(
    AssessmentRepository.getCreateSchemaCycleDDL(
      Schemas.getAssessmentSchema(assessment.props.name),
      Schemas.getCycleSchema(assessment.props.name, name)
    )
  )

  const cycle = await client.one<Cycle>(
    `insert into assessment_cycle (assessment_id, name) values ($1, $2) returning *;`,
    [assessment.id, name]
  )

  return {
    ...assessment,
    cycles: [...(assessment.cycles ?? []), cycle],
  }
}
