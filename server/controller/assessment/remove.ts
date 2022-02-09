import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository, AssessmentCycleRepository } from '@server/repository'
import { Assessment } from '@meta/assessment'

export const remove = async (
  props: { assessment: Assessment },
  client: BaseProtocol = DB
): Promise<{ schemaName: string; cycleSchemaNames: Array<string> }> => {
  const { assessment } = props

  const schemaName = await AssessmentRepository.removeAssessmentSchema({ assessment }, client)

  const cycleSchemaNames = await Promise.all(
    assessment.cycles.map((cycle) => AssessmentCycleRepository.removeCycleSchema({ assessment, cycle }))
  )

  AssessmentRepository.removeAssessment({ assessment }, client)

  return {
    schemaName,
    cycleSchemaNames,
  }
}
