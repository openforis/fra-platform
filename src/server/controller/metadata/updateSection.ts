import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Section } from 'meta/assessment/section'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const updateSection = async (
  props: { user: User; assessment: Assessment; section: Section },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { assessment, section, user } = props

  return client.tx(async (t) => {
    const updatedSection = await SectionRepository.update({ section, assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedSection,
          section: 'section',
          message: ActivityLogMessage.sectionUpdate,
          user,
        },
        assessment,
      },
      t
    )
    return updatedSection
  })
}
