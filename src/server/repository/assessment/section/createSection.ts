import { Objects } from '@utils/objects'

import { Assessment, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const createSection = async (
  params: {
    section: Pick<Section, 'props'>
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { section, assessment } = params
  const schemaName = Schemas.getName(assessment)

  // Change values to values
  return client.one<Section>(
    `
        insert into ${schemaName}.section (props)
        values ('${JSON.stringify(section.props)}'::jsonb);`,
    [],
    Objects.camelize
  )
}
