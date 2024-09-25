import * as pgPromise from 'pg-promise'

import { Assessment, Cycle, Row, Rows } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
  rows: Array<Row>
}

/**
 * This method clones rows.
 *
 * @param props
 */
export const cloneMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget, rows } = props
  const updates: Array<{ id: number; props: Row['props'] }> = []

  rows.forEach((row) => {
    const _props = Rows.cloneProps({ cycleSource, cycleTarget, row })
    updates.push({ id: row.id, props: _props })
  })

  const pgp = pgPromise()
  const schemaAssessment = Schemas.getName(assessment)
  const columns = ['?id', { cast: 'jsonb', name: 'props' }]
  const options = { table: { table: 'row', schema: schemaAssessment } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = `${pgp.helpers.update(updates, cs)} WHERE v.id = t.id`
  await client.query(query)
}
