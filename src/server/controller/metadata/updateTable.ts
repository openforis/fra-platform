import { ActivityLogMessage, Assessment, Table } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

// Controller to update Table
export const updateTable = async (
  props: { user: User; assessment: Assessment; table: Table },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { user, assessment, table } = props

  return client.tx(async (t) => {
    const updatedTable = await TableRepository.update({ table, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedTable,
          section: 'table',
          message: ActivityLogMessage.tableUpdate,
          user,
        },
        assessment,
      },
      t
    )
    return updatedTable
  })
}
