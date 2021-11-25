import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { RegionGroup } from '@core/meta/regionGroup'

export const getRegionGroups = async (client: BaseProtocol = DB): Promise<Array<RegionGroup>> => {
  return AssessmentRepository.getRegionGroups(client)
}
