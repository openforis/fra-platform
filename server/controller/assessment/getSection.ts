import { Assessment, Cycle } from '@meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'

export const getSection = async (
  props: { assessment: Assessment; cycle: Cycle; sectionName: string },
  client: BaseProtocol = DB
): Promise<any> => {
  const { assessment, cycle, sectionName } = props

  return AssessmentRepository.getSection({ assessment, assessmentCycleUuid: cycle.uuid, sectionName }, client)
}
