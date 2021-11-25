import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { RegionGroup } from '@core/meta/regionGroup'
import { Assessment } from '@core/meta/assessment'

export const getRegionGroups = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Array<RegionGroup>> => {
  const { assessment } = props
  return AssessmentRepository.getRegionGroups({ assessment }, client)
}
