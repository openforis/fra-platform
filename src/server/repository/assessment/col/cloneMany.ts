import * as pgPromise from 'pg-promise'

import { Assessment, Col, Cols, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
  cols: Array<Col>
}

/**
 * This method clones rows.
 *
 * @param props
 */
export const cloneMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget, cols } = props
  const updates: Array<{ id: number; props: Col['props'] }> = []

  cols.forEach((col) => {
    const _props = Cols.cloneProps({ cycleSource, cycleTarget, col })
    updates.push({ id: col.id, props: _props })
  })

  const pgp = pgPromise()
  const schemaAssessment = Schemas.getName(assessment)
  const columns = ['?id', { cast: 'jsonb', name: 'props' }]
  const options = { table: { table: 'col', schema: schemaAssessment } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = `${pgp.helpers.update(updates, cs)} WHERE v.id = t.id`
  await client.query(query)
}
