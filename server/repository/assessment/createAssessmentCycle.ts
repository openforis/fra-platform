import { Assessment, Cycle } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const createAssessmentCycle = async (
  params: {
    assessment: Assessment
    name: string
  },
  client: BaseProtocol = DB
): Promise<Cycle> => {
  const { assessment, name } = params

  return client.one<Cycle>(
    `insert into assessment_cycle (assessment_id, name) values ($1, $2) returning *`,
    [assessment.id, name],
    Objects.camelize
  )
}
