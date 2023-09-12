import { ActivityLogMessage, Assessment, Section } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const updateSection = async (
  props: { user: User; assessment: Assessment; section: Section },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { user, assessment, section } = props

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
