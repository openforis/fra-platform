import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment, Cycle } from '@core/meta/assessment'

export const getAssessmentCycles = async (
  props: { assessment: Assessment },
  client: BaseProtocol = DB
): Promise<Array<Cycle>> => {
  return AssessmentRepository.getAssessmentCycles(props, client)
}
