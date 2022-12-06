import { Objects } from '@utils/objects'

import { Assessment, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const create = async (
  params: {
    section: Pick<Section, 'props'>
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { section, assessment } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<Section>(
    `
        insert into ${schemaName}.section (props)
        values ($1::JSONB) returning *;`,
    [JSON.stringify(section.props)],
    Objects.camelize
  )
}
