import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Section, Assessment } from '@meta/assessment'

export const readTablesMetadata = async (
  props: {
    assessment: Assessment
    section: string
  },
  client: BaseProtocol = DB
): Promise<Array<Section>> => {
  const { section, assessment } = props
  const schemaName = Schemas.getName(assessment)

  return client
    .manyOrNone<any>(
      `
          select * from ${schemaName}.table where table_section_id in (
              select id
              from ${schemaName}.table_section
              where section_id in (select id from ${schemaName}.section where props ->> 'name' = $1)
          )
      `,
      [section]
    )
    .then(Objects.camelize)
}
