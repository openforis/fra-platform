import { ActivityLogMessage, Assessment, Table, TableProps } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  table: Table
  tableProps: Partial<TableProps>
  user: User
}

// Controller to update Table
export const updateTable = async (props: Props, client: BaseProtocol = DB): Promise<Table> => {
  const { assessment, table, tableProps, user } = props

  return client.tx(async (t) => {
    const target = await TableRepository.update({ assessment, tableId: table.id, tableProps }, t)

    const activityLog = { target, section: 'table', message: ActivityLogMessage.tableUpdate, user }
    await ActivityLogRepository.insertActivityLog({ assessment, activityLog }, t)

    return target
  })
}
