import { ActivityLogMessage, Assessment, Section } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const removeSection = async (
  props: { assessment: Assessment; section: Section; user?: User },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, section, user } = props

  return client.tx(async (t) => {
    const deletedSection = await SectionRepository.remove({ assessment, section }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { deletedSection },
          section: 'section',
          message: ActivityLogMessage.sectionDelete,
          user,
        },
        assessment,
      },
      t
    )
  })
}
