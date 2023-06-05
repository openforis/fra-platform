import { ActivityLogMessage, Assessment, SubSection } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const createSubSection = async (
  props: { user: User; assessment: Assessment; section: Pick<SubSection, 'props'>; parentSectionId: number },
  client: BaseProtocol = DB
): Promise<SubSection> => {
  const { user, assessment, section, parentSectionId } = props

  return client.tx(async (t) => {
    const createdSection = await SectionRepository.createSubSection({ section, assessment, parentSectionId }, t)

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
