import { Assessment } from 'meta/assessment/assessment'
import { Section } from 'meta/assessment/section'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

export const remove = async (
  params: {
    section: Section
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { assessment, section } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<Section>(
    `
      delete from ${schemaName}.section where id = ($1) returning *;`,
    [+section.id],
    SectionAdapter
  )
}
