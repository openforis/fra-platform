import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'

type Props = { assessment: Assessment }

type Returned = { schemaName: string; cycleSchemaNames: Array<string> }

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment } = props

  await AssessmentRedisRepository.removeOne({ assessment }, client)
  await AssessmentRepository.removeAssessment({ assessment }, client)

  const schemaName = await AssessmentRepository.removeAssessmentSchema({ assessment })

  const cycleSchemaNames = await Promise.all(
    assessment.cycles.map((cycle) => CycleRepository.removeSchema({ assessment, cycle }))
  )

  return {
    schemaName,
    cycleSchemaNames,
  }
}
