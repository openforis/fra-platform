import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { SubSection } from 'meta/assessment/section'
import { User } from 'meta/user/user'
import { UUID } from 'meta/uuid/uuid'

import { BaseProtocol, DB } from 'server/db/db'
import { SectionRepository } from 'server/db/repository/assessment/section'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  parentSectionUuid?: UUID
  section: SubSection
  user: User
}

export const updateSubSection = async (props: Props, client: BaseProtocol = DB): Promise<SubSection> => {
  const { assessment, parentSectionUuid, section, user } = props

  return client.tx(async (t) => {
    const updatedSection = await SectionRepository.updateSubSection({ section, assessment, parentSectionUuid }, t)

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
