import * as pgPromise from 'pg-promise'

import { BaseProtocol, DB } from 'server/db'

import { ActivityLogDb } from './activityLogDb'

type Props = {
  activityLogs: Array<ActivityLogDb<any>>
}

export const massiveInsert = (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { activityLogs } = props

  const pgp = pgPromise()
  const columns = [
    'assessment_uuid',
    'cycle_uuid',
    'country_iso',
    'section',
    'message',
    { name: 'target', cast: 'jsonb' },
    'user_id',
  ]
  const table = { table: 'activity_log', schema: 'public' }
  const cs = new pgp.helpers.ColumnSet(columns, { table })

  const query = `${pgp.helpers.insert(activityLogs, cs)}`
  return client.query(query)
}
