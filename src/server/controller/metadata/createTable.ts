import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Table } from 'meta/assessment/table'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

// Controller to create Table that belongs to a TableSection
export const createTable = async (
  props: { user: User; assessment: Assessment; table: Pick<Table, 'props' | 'tableSectionUuid'> },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { assessment, table, user } = props

  return client.tx(async (t) => {
    const createdTable = await TableRepository.create({ table, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: createdTable,
          section: 'table',
          message: ActivityLogMessage.tableCreate,
          user,
        },
        assessment,
      },
      t
    )
    return createdTable
  })
}
