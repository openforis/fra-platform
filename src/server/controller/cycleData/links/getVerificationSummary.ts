import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'

import {
  getLastVerificationExecutedAt,
  getLatestDate,
} from 'server/controller/cycleData/links/utils/getLastVerificationExecutedAt'
import { BaseProtocol, DB } from 'server/db/db'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

// lastExecutedAt resolution:
// 1. Global: latest of successful queue job finish time and activity_log linksCheckComplete time.
// 2. Country: latest of (global) and country-scoped job/activity_log completion.
export const getVerificationSummary = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<LinksVerificationSummary> => {
  const { assessment, countryIso, cycle } = props

  const [summary, globalActivityLog, globalJobStatus, countryActivityLog, countryJobStatus] = await Promise.all([
    LinkRepository.getVerificationSummary({ assessment, countryIso, cycle }, client),
    ActivityLogRepository.getLastLinksCheckCompleteTime({ assessment, cycle }, client),
    new VerifyLinksJob({ assessment, cycle }).getStatus(),
    countryIso
      ? ActivityLogRepository.getLastLinksCheckCompleteTime({ assessment, countryIso, cycle }, client)
      : undefined,
    countryIso ? new VerifyLinksJob({ assessment, countryIso, cycle }).getStatus() : undefined,
  ])

  const globalLastExecutedAt = getLastVerificationExecutedAt({
    activityLog: globalActivityLog,
    jobStatus: globalJobStatus,
  })

  let countryLastExecutedAt: string | undefined = undefined
  if (countryIso) {
    countryLastExecutedAt = getLastVerificationExecutedAt({
      activityLog: countryActivityLog,
      jobStatus: countryJobStatus,
    })
  }

  let lastExecutedAt = globalLastExecutedAt
  if (countryIso) {
    lastExecutedAt = getLatestDate([globalLastExecutedAt, countryLastExecutedAt])
  }
  const neverRan = !lastExecutedAt

  return {
    invalidCount: summary.invalidCount ?? 0,
    invalidUnapprovedCount: summary.invalidUnapprovedCount ?? 0,
    lastExecutedAt,
    neverRan,
  }
}
