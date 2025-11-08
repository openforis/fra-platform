import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { TableSectionRepository } from 'server/db/repository/assessment/tableSection'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

// Controller to remove TableSection
export const removeTableSection = async (
  props: { user: User; assessment: Assessment; tableSection: TableSection },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, tableSection, user } = props

  return client.tx(async (t) => {
    const deletedTableSection = await TableSectionRepository.remove({ tableSection, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { deletedTableSection },
          section: 'tableSection',
          message: ActivityLogMessage.tableSectionDelete,
          user,
        },
        assessment,
      },
      t
    )
  })
}
