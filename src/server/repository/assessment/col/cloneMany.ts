import * as pgPromise from 'pg-promise'

import { AssessmentBase } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: AssessmentBase
  cycleSource: Cycle
  cycleTarget: Cycle
  cols: Array<Col>
}

/**
 * This method clones cols.
 *
 * @param props
 */
export const cloneMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cols, cycleSource, cycleTarget } = props
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
