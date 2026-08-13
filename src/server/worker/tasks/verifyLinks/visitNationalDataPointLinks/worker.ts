import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { DataValidationService } from 'server/service/dataValidation'
import { Logger } from 'server/utils/logger'

import { buildNationalDataPointLinks } from './utils/buildNationalDataPointLinks'
import { mergeTargets } from './utils/mergeTargets'
import { syncNationalDataPointLinks } from './utils/syncNationalDataPointLinks'
import { VerifyNationalDataPointLinksJob } from './props'

const _getLogKey = (job: VerifyNationalDataPointLinksJob): string => {
  const { assessment, countryIso, cycle } = job.data

  return `[visitNationalDataPointLinks-workerThread] [${assessment.props.name}-${cycle.name}-${countryIso}] [job-${job.id}]`
}

export default async (job: VerifyNationalDataPointLinksJob): Promise<void> => {
  const logKey = _getLogKey(job)

  try {
    const { assessment, countryIso, cycle, notifyClients, targets: rawTargets } = job.data
    const commonProps = { assessment, countryIso, cycle }
    const time = new Date().getTime()

    Logger.info(`${logKey} started.`)

    const targets = mergeTargets({ targets: rawTargets }) // Merge duplicated targets

    const nationalDataPoints = await OriginalDataPointRepository.getMany({
      assessment,
      countryISOs: [countryIso],
      cycle,
    })
    const linksToVisit = buildNationalDataPointLinks({ ...commonProps, nationalDataPoints, targets })

    const syncResult = await syncNationalDataPointLinks({ ...commonProps, linksToVisit, targets })

    const props = { ...commonProps, ...syncResult, linksToVisit, nationalDataPoints, notifyClients, targets }
    await DataValidationService.updateNDPValidations(props)

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${syncResult.linkVisits.length} links visited.`)
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    throw error
  }
}
