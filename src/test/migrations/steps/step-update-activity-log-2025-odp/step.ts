import { BaseProtocol } from 'server/db'

import { getDiffs } from './diff/getDiffs'
import { getActivityLogEntries } from './getActivityLogEntries'

export default async (client: BaseProtocol) => {
  const activityLogEntries = await getActivityLogEntries(client)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _diffs = getDiffs(activityLogEntries)

  // TODO:
  // Remove debug information
  // Write to DB
}
