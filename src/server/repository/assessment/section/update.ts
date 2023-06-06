import { Assessment, Section, SubSection } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { SectionAdapter, SubSectionAdapter } from 'server/repository/adapter'

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
      where id = $2 returning *;`,
    [JSON.stringify(section.props), section.id],
    SectionAdapter
  )
}

export const updateSubSection = async (
  params: {
    section: SubSection
    assessment: Assessment
    parentSectionId?: number
  },
  client: BaseProtocol = DB
): Promise<SubSection> => {
  const { section, assessment, parentSectionId } = params
  const schemaName = Schemas.getName(assessment)
  const propsValues = JSON.stringify(section.props)
  const updateParentSectionId = parentSectionId
    ? `props = '${propsValues}'::JSONB, parent_id = ${parentSectionId}`
    : `props = '${propsValues}'::JSONB`

  return client.one<SubSection>(
    `
      update ${schemaName}.section
      set ${updateParentSectionId}
      where id = ${section.id} returning *;`,
    [],
    SubSectionAdapter
  )
}
