import * as pgPromise from 'pg-promise'

import { BaseProtocol } from 'server/db'

import { getDiffs } from './diff/getDiffs'
import { getActivityLogEntries } from './getActivityLogEntries'

export default async (client: BaseProtocol) => {
  const activityLogEntries = await getActivityLogEntries(client)
  const _diffs = getDiffs(activityLogEntries)
  const diffs = _diffs.filter((d) => !['EQUAL', 'ERROR'].includes(d.newMessage))

  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet<{ id: string; message: string }>(
    [
      { name: 'id', cast: 'bigint', cnd: true },
      { name: 'message', prop: 'newMessage', cast: 'varchar' },
    ],
    { table: { table: 'activity_log', schema: 'public' } }
  )

  const query = `${pgp.helpers.update(diffs, cs)} where v.id = t.id;`

  await client.query(query)
}
