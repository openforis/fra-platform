import { Assessment, Cycle } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'

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
      Schemas.getName(assessment),
      Schemas.getNameCycle(assessment, { name } as Cycle)
    )
  )

  await DB.query(
    AssessmentRepository.getCreateSchemaCycleOriginalDataPointViewDDL(
      Schemas.getNameCycle(assessment, { name } as Cycle)
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
