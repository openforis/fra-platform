import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Link } from 'meta/cycleData/links/link'
import { SectionNames } from 'meta/routes'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  link: Link
  user: User
}

export const update = async (props: Props): Promise<Link> => {
  const { assessment, cycle, user } = props

  return DB.tx(async (t: BaseProtocol) => {
    const updatedLink = await LinkRepository.update(props, t)
    const { id, link, props: _props, uuid } = updatedLink
    const target = { id, link, props: _props, uuid }

    const message = ActivityLogMessage.linkUpdate
    const section = SectionNames.Admin.links
    const activityLog = { target, section, message, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return updatedLink
  })
}
