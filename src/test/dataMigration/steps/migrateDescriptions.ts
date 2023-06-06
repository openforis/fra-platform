import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

export const migrateDescriptions = async (props: { assessment: Assessment; cycle: Cycle }, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(`
      insert into ${schemaCycle}.descriptions (country_iso, section_name, name, value)
      select d.country_iso, d.section, d.name,jsonb_build_object(
              'text', d.content
          )
      from _legacy.descriptions d;
  `)
}
