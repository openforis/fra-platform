import { Objects } from '@utils/objects'

import { RegionCode, RegionGroup } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'
import { ProcessEnv } from '@server/utils'

export const getRegionGroups = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<RegionGroup>> => {
  const { assessment, cycle } = props
  const assessmentName = Schemas.getNameCycle(assessment, cycle)

  let atlantis = ''
  // Remove atlantis regions from published cycles
  if (cycle.published || !ProcessEnv.fraAtlantisAlloawed) {
    atlantis = `where r.region_code != '${RegionCode.AT}'`
  }

  const { regionGroups } = await client
    .one<RegionGroup>(
      `
          with r as (
              select rg."order",
                     jsonb_build_object(
                             'id', rg.id,
                             'name', rg.name,
                             'order', rg."order",
                             'regions', jsonb_agg(
                                     jsonb_build_object('region_code', r2.region_code, 'name', r2.name)
                                     order by r2.region_code
                                 )
                         ) as region_group
              from ${assessmentName}.region r
                       join ${assessmentName}.region_group rg on r.region_group_id = rg.id
                       left join region r2 on r.region_code = r2.region_code
                  ${atlantis}
              group by rg.order, rg.id
          )
          select jsonb_object_agg(r."order", r.region_group) as region_groups
          from r;
    `
    )
    .then((data) => Objects.camelize(data))

  return regionGroups
}
