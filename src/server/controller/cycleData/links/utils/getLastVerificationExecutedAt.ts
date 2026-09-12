import type { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import type { JobStatusPayload } from 'server/worker/job/jobStatus'
import { JobStatus } from 'server/worker/job/jobStatus'

type LastLinksCheckCompleteTime = Awaited<ReturnType<typeof ActivityLogRepository.getLastLinksCheckCompleteTime>>

type Props = {
  activityLog?: LastLinksCheckCompleteTime
  jobStatus?: JobStatusPayload
}

export const getLatestDate = (dates: Array<string | Date | undefined>): string | undefined => {
  // Normalize dates
  const validDates = dates
    .filter(Boolean)
    .map((value) => (value instanceof Date ? value.toISOString() : value)) as Array<string>
  if (validDates.length === 0) return undefined

  return validDates.reduce((latest, current) => {
    if (new Date(current).getTime() > new Date(latest).getTime()) return current
    return latest
  })
}

export const getLastVerificationExecutedAt = (props: Props): string | undefined => {
  const { activityLog, jobStatus } = props

  const lastJobFinishedAt = jobStatus?.status === JobStatus.success ? jobStatus.finishedAt : undefined
  const lastActivityLogCompleteTime = activityLog?.lastCompletedAt ?? undefined

  return getLatestDate([lastJobFinishedAt, lastActivityLogCompleteTime])
}
