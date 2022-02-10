import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Table } from '@meta/assessment'

export const readTablesMetadata = async (
  props: {
    assessment: Assessment
    section: string
  },
  client: BaseProtocol = DB
): Promise<Array<Table>> => {
  const { section, assessment } = props
  const schemaName = Schemas.getName(assessment)

  return client.map<Table>(
    `
          select * from ${schemaName}.table where table_section_id in (
              select id
              from ${schemaName}.table_section
              where section_id in (select id from ${schemaName}.section where props ->> 'name' = $1)
          )
      `,
    [section],
    // @ts-ignore
    Objects.camelize
  )
}
