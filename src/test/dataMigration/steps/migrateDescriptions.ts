import { Assessment } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
}

export const migrateDescriptions = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle = assessment.cycles.find((c) => c.name === '2020')
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(`
      insert into ${schemaCycle}.descriptions (country_iso, section_name, name, value)
      select d.country_iso, d.section, d.name,jsonb_build_object(
              'text', d.content
          )
      from _legacy.descriptions d;
  `)
}
