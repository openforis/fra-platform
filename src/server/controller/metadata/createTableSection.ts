import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { TableSectionRepository } from 'server/db/repository/assessment/tableSection'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

// Controller to create TableSection
export const createTableSection = async (
  props: { user: User; assessment: Assessment; tableSection: Pick<TableSection, 'props'> },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { assessment, tableSection, user } = props

  return client.tx(async (t) => {
    const createdTableSection = await TableSectionRepository.create({ tableSection, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: createdTableSection,
          section: 'tableSection',
          message: ActivityLogMessage.tableSectionCreate,
          user,
        },
        assessment,
      },
      t
    )
    return createdTableSection
  })
}
