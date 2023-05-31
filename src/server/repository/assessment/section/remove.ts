import { Assessment, Section } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { SectionAdapter } from 'server/repository/adapter'

export const remove = async (
  params: {
    section: Section
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { section, assessment } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<Section>(
    `
      delete from ${schemaName}.section where id = ($1) returning *;`,
    [+section.id],
    SectionAdapter
  )
}
