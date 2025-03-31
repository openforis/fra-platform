import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { TableSectionRepository } from 'server/repository/assessment/tableSection'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

// Controller to create TableSection
export const createTableSection = async (
  props: { user: User; assessment: Assessment; tableSection: Pick<TableSection, 'props'> },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { user, assessment, tableSection } = props

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
