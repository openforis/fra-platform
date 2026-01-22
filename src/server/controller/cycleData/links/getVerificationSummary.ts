import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'

import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { JobStatus } from 'server/worker/job/jobStatus'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

export const getVerificationSummary = async (props: Props): Promise<LinksVerificationSummary> => {
  const { assessment, countryIso, cycle } = props

  const verifyLinksJob = new VerifyLinksJob({ assessment, countryIso, cycle })
  const [summary, activityLog, jobStatus] = await Promise.all([
    LinkRepository.getVerificationSummary({ assessment, countryIso, cycle }),
    ActivityLogRepository.getLastLinksCheckCompleteTime({ assessment, countryIso, cycle }),
    verifyLinksJob.getStatus(),
  ])

  const lastJobFinishedAt = jobStatus?.status === JobStatus.success ? jobStatus.finishedAt : undefined
  const lastActivityLogCompleteTime = activityLog?.lastCompletedAt ?? undefined
  const lastVisitedAt = summary.lastVisitedAt ? new Date(Number(summary.lastVisitedAt)).toISOString() : undefined
  const lastExecutedAt = lastJobFinishedAt ?? lastActivityLogCompleteTime ?? lastVisitedAt
  const neverRan = !lastExecutedAt

  return {
    invalidCount: summary.invalidCount ?? 0,
    invalidUnapprovedCount: summary.invalidUnapprovedCount ?? 0,
    lastExecutedAt,
    neverRan,
  }
}
