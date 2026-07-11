import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/routes/sectionNames'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type LinksCheckStatus = 'started' | 'completed' | 'failed'

const messageByStatus: Record<LinksCheckStatus, ActivityLogMessage> = {
  started: ActivityLogMessage.linksCheckStart,
  completed: ActivityLogMessage.linksCheckComplete,
  failed: ActivityLogMessage.linksCheckFail,
}

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  error?: unknown
  status: LinksCheckStatus
  user: User
}

export const insertLinksCheckActivityLog = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, error, status, user } = props

  const message = messageByStatus[status]
  const section = SectionNames.Admin.links
  const target = { error, jobStatus: status }
  const activityLog = { countryIso, message, section, target, user }
  await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, client)
}
