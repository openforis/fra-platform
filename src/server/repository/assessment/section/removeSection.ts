import { Objects } from '@utils/objects'

import { Assessment, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

// Change name to remove
export const removeAssessmentSection = async (
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
      delete from ${schemaName}.section
      where id = ${section.id} retuning *;`,
    [],
    Objects.camelize
  )
}
