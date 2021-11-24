import { BaseProtocol, DB } from '@server/db'
import { RegionGroup } from '@core/meta/regionGroup'
import { Objects } from '@core/utils'

export const readAll = async (client: BaseProtocol = DB): Promise<Array<RegionGroup>> => {
  const items = await client.many<RegionGroup>(
    `
        select * from public.region_group;
    `
  )

  return Objects.camelize(items)
}
