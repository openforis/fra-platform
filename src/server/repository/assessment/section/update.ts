import { Objects } from '@utils/objects'

import { Assessment, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const update = async (
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
      update ${schemaName}.section
      set props = $1::jsonb
      where id = $2;`,
    [JSON.stringify(section.props), section.id],
    Objects.camelize
  )
}
