import * as TurndownService from 'turndown'
// @ts-ignore
import { tables } from 'turndown-plugin-gfm'

import { Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

const turndownService = new TurndownService()
turndownService.use(tables)

export const migrateDescriptions = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const descriptions = await client.many<any>(`
    select d.country_iso, d.section, d.name, d.content
    from _legacy.descriptions d;
  `)

  await descriptions.forEach(async (description) => {
    client.query(
      `
        insert into ${schemaCycle}.descriptions (country_iso, section_name, name, value)
        values ($1, $2, $3, jsonb_build_object('text', $4))
    `,
      [description.country_iso, description.section, description.name, turndownService.turndown(description.content)]
    )
  })
}
