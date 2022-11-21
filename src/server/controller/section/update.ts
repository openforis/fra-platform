import { Objects } from '@utils/objects'

import { Assessment, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const updateSection = async (
  props: { assessment: Assessment; section: Section },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { assessment, section } = props
  const schemaName = Schemas.getName(assessment)

  // Move to sectionRepository
  return client.one<Section>(
    `
        update ${schemaName}.section
        set props = '${JSON.stringify(section.props)}'::jsonb
        where id = ${section.id}
        returning *;
        `,
    [],
    Objects.camelize
  )
  // ActivityLog
}
