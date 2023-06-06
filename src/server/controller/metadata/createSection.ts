import { ActivityLogMessage, Assessment, Section } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const createSection = async (
  props: { user: User; assessment: Assessment; section: Pick<Section, 'props'> },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { user, assessment, section } = props

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
