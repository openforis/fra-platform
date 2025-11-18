import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Section } from 'meta/assessment/section'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionRepository } from 'server/db/repository/assessment/section'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

export const createSection = async (
  props: { user: User; assessment: Assessment; section: Pick<Section, 'props'> },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { assessment, section, user } = props

  return client.tx(async (t) => {
    const createdSection = await SectionRepository.create({ section, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: createdSection,
          section: 'section',
          message: ActivityLogMessage.sectionCreate,
          user,
        },
        assessment,
      },
      t
    )
    return createdSection
  })
}
