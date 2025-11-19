import { Assessment } from 'meta/assessment/assessment'
import { Section, SubSection } from 'meta/assessment/section'
import { UUID } from 'meta/uuid/uuid'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionAdapter, SubSectionAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

export const create = async (
  params: {
    section: Pick<Section, 'props'>
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { assessment, section } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<Section>(
    `
        insert into ${schemaName}.section (props)
        values ($1::JSONB) returning *;`,
    [JSON.stringify(section.props)],
    SectionAdapter
  )
}

export const createSubSection = async (
  params: {
    section: Pick<SubSection, 'props'>
    assessment: Assessment
    parentSectionUuid: UUID
  },
  client: BaseProtocol = DB
): Promise<SubSection> => {
  const { assessment, parentSectionUuid, section } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<SubSection>(
    `
      insert into ${schemaName}.section (props, parent_uuid)
      values ($1::JSONB, $2) returning *;`,
    [JSON.stringify(section.props), parentSectionUuid],
    SubSectionAdapter
  )
}
