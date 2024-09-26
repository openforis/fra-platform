import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { BaseProtocol, Schemas } from 'server/db'

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
      select country_iso, props
      from ${schemaCycleSource}.country;

      insert into ${schemaCycleTarget}.country_region (country_iso, region_code)
      select country_iso, region_code
      from ${schemaCycleSource}.country_region;

  `)
}
