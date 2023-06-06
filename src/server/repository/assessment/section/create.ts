import { Assessment, Section, SubSection } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { SectionAdapter, SubSectionAdapter } from 'server/repository/adapter'

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
    SectionAdapter
  )
}

export const createSubSection = async (
  params: {
    section: Pick<SubSection, 'props'>
    assessment: Assessment
    parentSectionId: number
  },
  client: BaseProtocol = DB
): Promise<SubSection> => {
  const { section, assessment, parentSectionId } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<SubSection>(
    `
      insert into ${schemaName}.section (props, parent_id)
      values ($1::JSONB, $2) returning *;`,
    [JSON.stringify(section.props), parentSectionId],
    SubSectionAdapter
  )
}
