import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'

export const remove = async (
  props: { assessment: Assessment },
  client: BaseProtocol = DB
): Promise<{ schemaName: string; cycleSchemaNames: Array<string> }> => {
  const { assessment } = props

  const schemaName = await AssessmentRepository.removeAssessmentSchema({ assessment })

  const cycleSchemaNames = await Promise.all(assessment.cycles.map((cycle) => CycleRepository.removeSchema({ assessment, cycle })))

  await AssessmentRepository.removeAssessment({ assessment }, client)

  return {
    schemaName,
    cycleSchemaNames,
  }
}
