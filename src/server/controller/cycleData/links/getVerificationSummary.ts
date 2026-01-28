import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'

import { BaseProtocol, DB } from 'server/db/db'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { JobStatus, JobStatusPayload } from 'server/worker/job/jobStatus'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

const _getLatestDate = (dates: Array<string | undefined>): string | undefined => {
  const validDates = dates.filter(Boolean) as Array<string>
  if (validDates.length === 0) return undefined

  return validDates.reduce((latest, current) => {
    if (new Date(current).getTime() > new Date(latest).getTime()) return current
    return latest
  })
}

type LastLinksCheckCompleteTime = Awaited<ReturnType<typeof ActivityLogRepository.getLastLinksCheckCompleteTime>>

type ExecutionInfo = {
  activityLog?: LastLinksCheckCompleteTime
  jobStatus?: JobStatusPayload
  lastVisitedAt?: string
}

const _getLastExecutedAtFromInfo = (props: ExecutionInfo): string | undefined => {
  const { activityLog, jobStatus, lastVisitedAt } = props

  const lastJobFinishedAt = jobStatus?.status === JobStatus.success ? jobStatus.finishedAt : undefined
  const lastActivityLogCompleteTime = activityLog?.lastCompletedAt ?? undefined

  return _getLatestDate([lastJobFinishedAt, lastActivityLogCompleteTime, lastVisitedAt])
}

type GlobalLastExecutedAtProps = {
  assessment: Assessment
  cycle: Cycle
}

const _getGlobalLastExecutedAt = async (
  props: GlobalLastExecutedAtProps,
  client: BaseProtocol
): Promise<string | undefined> => {
  const { assessment, cycle } = props

  const verifyLinksJob = new VerifyLinksJob({ assessment, cycle })
  const [activityLog, jobStatus] = await Promise.all([
    ActivityLogRepository.getLastLinksCheckCompleteTime({ assessment, cycle }, client),
    verifyLinksJob.getStatus(),
  ])

  return _getLastExecutedAtFromInfo({ activityLog, jobStatus })
}

type CountryLastExecutedAtProps = GlobalLastExecutedAtProps & {
  countryIso: CountryIso
  lastVisitedAt?: string
}

const _getCountryLastExecutedAt = async (
  props: CountryLastExecutedAtProps,
  client: BaseProtocol
): Promise<string | undefined> => {
  const { assessment, countryIso, cycle, lastVisitedAt } = props

  const verifyLinksJob = new VerifyLinksJob({ assessment, countryIso, cycle })
  const [activityLog, jobStatus] = await Promise.all([
    ActivityLogRepository.getLastLinksCheckCompleteTime({ assessment, countryIso, cycle }, client),
    verifyLinksJob.getStatus(),
  ])

  return _getLastExecutedAtFromInfo({ activityLog, jobStatus, lastVisitedAt })
}

// lastExecutedAt resolution:
// 1. Global: latest of successful queue job finish time and activity_log linksCheckComplete time.
// 2. Country: latest of (global) and country-scoped job/activity_log completion.
// 3. Country fallback: lastVisitedAt from link table (only when countryIso is provided).
export const getVerificationSummary = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<LinksVerificationSummary> => {
  const { assessment, countryIso, cycle } = props

  const [summary, globalLastExecutedAt] = await Promise.all([
    LinkRepository.getVerificationSummary({ assessment, countryIso, cycle }, client),
    _getGlobalLastExecutedAt({ assessment, cycle }, client),
  ])

  // lastVisitedAt comes directly from the links table, it is used as a last fallback
  // when the countryIso is provided
  const lastVisitedAt =
    countryIso && summary.lastVisitedAt ? new Date(Number(summary.lastVisitedAt)).toISOString() : undefined

  let countryLastExecutedAt: string | undefined
  if (countryIso) {
    countryLastExecutedAt = await _getCountryLastExecutedAt({ assessment, countryIso, cycle, lastVisitedAt }, client)
  }

  let lastExecutedAt = globalLastExecutedAt
  if (countryIso) {
    lastExecutedAt = _getLatestDate([globalLastExecutedAt, countryLastExecutedAt])
  }
  const neverRan = !lastExecutedAt

  return {
    invalidCount: summary.invalidCount ?? 0,
    invalidUnapprovedCount: summary.invalidUnapprovedCount ?? 0,
    lastExecutedAt,
    neverRan,
  }
}
