import { ActivityLogMessage, Assessment, Table } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

// Controller to create Table that belongs to a TableSection
export const createTable = async (
  props: { user: User; assessment: Assessment; table: Pick<Table, 'props' | 'tableSectionId'> },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { user, assessment, table } = props

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
