import { ActivityLogMessage, Assessment, SubSection } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const updateSubSection = async (
  props: { user: User; assessment: Assessment; section: SubSection; parentSectionId?: number },
  client: BaseProtocol = DB
): Promise<SubSection> => {
  const { user, assessment, section, parentSectionId } = props

  return client.tx(async (t) => {
    const updatedSection = await SectionRepository.updateSubSection({ section, assessment, parentSectionId }, t)

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
