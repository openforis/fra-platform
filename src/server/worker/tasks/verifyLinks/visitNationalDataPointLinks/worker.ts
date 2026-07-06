import { Logger } from 'server/utils/logger'

import { getNationalDataPointLinks } from './utils/getNationalDataPointLinks'
import { syncNationalDataPointLinks } from './utils/syncNationalDataPointLinks'
import { VerifyNationalDataPointLinksJob } from './props'

const _getLogKey = (job: VerifyNationalDataPointLinksJob): string => {
  const { assessment, countryIso, cycle } = job.data

  return `[visitNationalDataPointLinks-workerThread] [${assessment.props.name}-${cycle.name}-${countryIso}] [job-${job.id}]`
}

export default async (job: VerifyNationalDataPointLinksJob): Promise<void> => {
  const logKey = _getLogKey(job)

  try {
    const { assessment, countryIso, cycle, targets } = job.data
    const time = new Date().getTime()

    Logger.info(`${logKey} started.`)

    const linksToVisit = await getNationalDataPointLinks({ assessment, countryIso, cycle, targets })

    const { linkVisits } = await syncNationalDataPointLinks({ assessment, countryIso, cycle, linksToVisit, targets })

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    throw error
  }
}
