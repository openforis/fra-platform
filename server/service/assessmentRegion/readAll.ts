import { BaseProtocol, DB } from '@server/db'
import { AssessmentRegionRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'
import { AssessmentRegion } from '@core/meta/assessmentRegion'

export const readAll = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<AssessmentRegion[]> => {
  const { assessment } = props

  return AssessmentRegionRepository.readAll({ assessment }, client)
}
