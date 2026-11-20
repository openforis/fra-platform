import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogLinksCheck, LinksCheckStatus } from 'meta/assessment/activityLog/links'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/routes/sectionNames'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

const messageByStatus: Record<LinksCheckStatus, ActivityLogLinksCheck['message']> = {
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
  // Error serializes to {} in jsonb, log it as text
  const target = { error: error ? String(error) : undefined, jobStatus: status }
  const activityLog: ActivityLogLinksCheck = { countryIso, message, section, target, user }
  await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, client)
}
