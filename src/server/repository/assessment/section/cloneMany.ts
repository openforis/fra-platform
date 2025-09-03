import * as pgPromise from 'pg-promise'

import { AssessmentBase } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { Sections } from 'meta/assessment/sections'
import { SubSections } from 'meta/assessment/subSections'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: AssessmentBase
  cycleSource: Cycle
  cycleTarget: Cycle
  sections: Array<Section>
}

/**
 * This method clones sections and their subsections.
 *
 * @param props
 */
export const cloneMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget, sections } = props
  const updates: Array<{ id: number; props: Section['props'] | SubSection['props'] }> = []

  sections.forEach((section) => {
    const sectionProps = Sections.cloneProps({ cycleSource, cycleTarget, section })
    updates.push({ id: section.id, props: sectionProps })

    section.subSections?.forEach((subSection) => {
      const subSectionProps = SubSections.cloneProps({ cycleSource, cycleTarget, subSection })
      updates.push({ id: subSection.id, props: subSectionProps })
    })
  })

  const pgp = pgPromise()
  const schemaAssessment = Schemas.getName(assessment)
  const columns = ['?id', { cast: 'jsonb', name: 'props' }]
  const options = { table: { table: 'section', schema: schemaAssessment } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = `${pgp.helpers.update(updates, cs)} WHERE v.id = t.id`
  await client.query(query)
}
