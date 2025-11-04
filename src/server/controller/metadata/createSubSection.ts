import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { SubSection } from 'meta/assessment/section'
import { User } from 'meta/user'
import { UUID } from 'meta/uuid'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionRepository } from 'server/db/repository/assessment/section'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  parentSectionUuid: UUID
  section: Pick<SubSection, 'props'>
  user: User
}

export const createSubSection = async (props: Props, client: BaseProtocol = DB): Promise<SubSection> => {
  const { assessment, parentSectionUuid, section, user } = props

  return client.tx(async (t) => {
    const createdSection = await SectionRepository.createSubSection({ section, assessment, parentSectionUuid }, t)

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
