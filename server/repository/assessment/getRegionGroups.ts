import { BaseProtocol, DB, Schemas } from '@server/db'
import { RegionGroup } from '@core/meta/regionGroup'
import { Objects } from '@core/utils'
import { Assessment } from '@core/meta/assessment'

export const getRegionGroups = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Array<RegionGroup>> => {
  const { assessment } = props
  const schemaName = Schemas.getName(assessment)
  return client
    .many<RegionGroup>(
      `
        select * from ${schemaName}.region_group;
    `
    )
    .then((data) => Objects.camelize(data))
}
