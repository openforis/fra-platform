import { BaseProtocol, DB } from '@server/db'
import { RegionGroup } from '@core/meta/regionGroup'
import { Objects } from '@core/utils'

export const getRegionGroups = async (
  props: { name: string },
  client: BaseProtocol = DB
): Promise<Array<RegionGroup>> => {
  const { name } = props
  const assessmentName = `assessment_${name}`

  return client
    .many<RegionGroup>(
      `
        select * from ${assessmentName}.region_group;
    `
    )
    .then((data) => Objects.camelize(data))
}
