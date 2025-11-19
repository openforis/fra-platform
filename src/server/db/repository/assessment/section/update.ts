import { Assessment } from 'meta/assessment/assessment'
import { Section, SubSection } from 'meta/assessment/section'
import { UUID } from 'meta/uuid/uuid'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionAdapter, SubSectionAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

export const update = async (
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
    parentSectionUuid?: UUID
  },
  client: BaseProtocol = DB
): Promise<SubSection> => {
  const { assessment, parentSectionUuid, section } = params
  const schemaName = Schemas.getName(assessment)
  const propsValues = JSON.stringify(section.props)
  const updateParentSectionUuid = parentSectionUuid
    ? `props = '${propsValues}'::JSONB, parent_uuid = '${parentSectionUuid}'`
    : `props = '${propsValues}'::JSONB`

  return client.one<SubSection>(
    `
      update ${schemaName}.section
      set ${updateParentSectionUuid}
      where id = ${section.id} returning *;`,
    [],
    SubSectionAdapter
  )
}
