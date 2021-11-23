import { BaseProtocol, DB } from '@server/db'
import { RegionGroupRepository } from '@server/repository'
import { RegionGroup } from '@core/meta/regionGroup'

export const readAll = async (client: BaseProtocol = DB): Promise<RegionGroup[]> => {
  return RegionGroupRepository.readAll(client)
}
