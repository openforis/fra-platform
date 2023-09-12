import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

export const cleanupCountryProps = async (props: { assessment: Assessment; cycle: Cycle }, client: BaseProtocol) => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  await client.query(`
      update
          ${schemaCycle}.country
      set props = props - 'faoStat' - 'certifiedAreas' - 'fra2015ForestAreas' - 'panEuropean' -
                  'climaticDomainPercents2015';

      ${
        cycle.name === '2025'
          ? `update ${schemaCycle}.country
                         set props = jsonb_set(props, '{status}', '"editing"');
                      `
          : ''
      }
  `)
}
