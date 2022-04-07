import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { RegionGroup } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

export const getRegionGroups = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<RegionGroup>> => {
  return AssessmentRepository.getRegionGroups(props, client)
}
