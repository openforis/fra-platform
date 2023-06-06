import { ActivityLogMessage, Assessment, Table } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

// Controller to remove Table
export const removeTable = async (
  props: { user: User; assessment: Assessment; table: Table },
  client: BaseProtocol = DB
): Promise<void> => {
  const { user, assessment, table } = props

  return client.tx(async (t) => {
    const deletedTable = await TableRepository.remove({ table, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { deletedTable },
          section: 'table',
          message: ActivityLogMessage.tableDelete,
          user,
        },
        assessment,
      },
      t
    )
  })
}
