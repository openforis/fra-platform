import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { RegionGroup } from '@core/meta/regionGroup'

export const getRegionGroups = async (
  props: { name: string },
  client: BaseProtocol = DB
): Promise<Array<RegionGroup>> => {
  const { name } = props
  return AssessmentRepository.getRegionGroups({ name }, client)
}
