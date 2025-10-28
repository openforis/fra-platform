import { CountryStatus } from 'meta/area'

import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { CloneProps } from 'server/controller/assessment/cloneCycle/types'

export const cloneAreas = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  const schemaCycleSource = Schemas.getNameCycle(assessment, cycleSource)
  const schemaCycleTarget = Schemas.getNameCycle(assessment, cycleTarget)

  await client.query(`
      insert into ${schemaCycleTarget}.region_group (id, name, "order")
      select id, name, "order"
      from ${schemaCycleSource}.region_group;

      insert into ${schemaCycleTarget}.region (region_group_id, region_code)
      select region_group_id, region_code
      from ${schemaCycleSource}.region;

      insert into ${schemaCycleTarget}.country (country_iso, props)
      select country_iso, props || jsonb_build_object('status','${CountryStatus.notStarted}')
      from ${schemaCycleSource}.country;

      insert into ${schemaCycleTarget}.country_region (country_iso, region_code)
      select country_iso, region_code
      from ${schemaCycleSource}.country_region;

  `)
}
