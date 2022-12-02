import { Objects } from '@utils/objects'

import { Assessment, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const updateAssessmentSection = async (
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
      set props = '${JSON.stringify(section.props)}'::jsonb
      where id = ${section.id};`,
    [],
    Objects.camelize
  )
}
