import { Assessment, Cycle, Section } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { SectionAdapter } from 'server/repository/adapter'

export const getOne = async (
  props: { assessment: Assessment; cycle: Cycle; sectionName: string } | { assessment: Assessment; cycle: Cycle; id: number },
  client: BaseProtocol = DB
): Promise<Section> => {
  const schemaName = Schemas.getName(props.assessment)
  return client.one<Section>(
    `
        select s.*
        from ${schemaName}.section s
        where ${'sectionName' in props ? `s.props->>'name' = $2` : `s.id = $2`}
          and props -> 'cycles' ? $1;
    `,
    [props.cycle.uuid, 'sectionName' in props ? props.sectionName : props.id],
    SectionAdapter
  )
}
