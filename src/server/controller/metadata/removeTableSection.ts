import { ActivityLogMessage, Assessment, TableSection } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { TableSectionRepository } from 'server/repository/assessment/tableSection'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

// Controller to remove TableSection
export const removeTableSection = async (
  props: { user: User; assessment: Assessment; tableSection: TableSection },
  client: BaseProtocol = DB
): Promise<void> => {
  const { user, assessment, tableSection } = props

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
