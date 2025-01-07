import * as pgPromise from 'pg-promise'

import { Assessment, Cycle, TableSection, TableSections } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
  tableSections: Array<TableSection>
}

/**
 * This method clones table sections.
 *
 * @param props
 */
export const cloneMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget, tableSections } = props
  const updates: Array<{ id: number; props: TableSection['props'] }> = []

  tableSections.forEach((tableSection) => {
    const _props = TableSections.cloneProps({ cycleSource, cycleTarget, tableSection })
    updates.push({ id: tableSection.id, props: _props })
  })

  const pgp = pgPromise()
  const schemaAssessment = Schemas.getName(assessment)
  const columns = ['?id', { cast: 'jsonb', name: 'props' }]
  const options = { table: { table: 'table_section', schema: schemaAssessment } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = `${pgp.helpers.update(updates, cs)} WHERE v.id = t.id`
  await client.query(query)
}
