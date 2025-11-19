import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { TableSectionRepository } from 'server/db/repository/assessment/tableSection'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

// Controller to update TableSection
export const updateTableSection = async (
  props: { user: User; assessment: Assessment; tableSection: TableSection },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { assessment, tableSection, user } = props

  return client.tx(async (t) => {
    const updatedTableSection = await TableSectionRepository.update({ tableSection, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedTableSection,
          section: 'tableSection',
          message: ActivityLogMessage.tableSectionUpdate,
          user,
        },
        assessment,
      },
      t
    )
    return updatedTableSection
  })
}
