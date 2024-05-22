import { CycleDataController } from 'server/controller/cycleData'
import { LinkRepository } from 'server/repository/assessmentCycle/link'
import { Logger } from 'server/utils/logger'

import { mergeAndFilterLinks } from './utils/mergeAndFilterLinks'
import { visitLinks } from './utils/visitLinks'
import { VisitCycleLinksJob } from './props'

const _getLogKey = (job: VisitCycleLinksJob): string => {
  const { assessment, cycle } = job.data

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  return `[visitCycleLinks-workerThread] [${[assessmentName, cycleName].join('-')}] [job-${job.id}]`
}

export default async (job: VisitCycleLinksJob): Promise<void> => {
  const logKey = _getLogKey(job)
  try {
    const { assessment, cycle } = job.data
    const time = new Date().getTime()
    Logger.info(`${logKey} started.`)

    const [linksToVisit, approvedLinks] = await Promise.all([
      CycleDataController.Link.getAllLinksToVisit({ assessment, cycle }),
      LinkRepository.getMany({ assessment, cycle, approved: true }),
    ])

    const mergedLinksToVisit = mergeAndFilterLinks({ approvedLinks, linksToVisit })

    const linkVisits = await visitLinks(mergedLinksToVisit)

    await LinkRepository.upsertMany({
      assessment,
      cycle,
      linkVisits,
    })

    // TODO: insert in activity log

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
    return Promise.resolve()
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}
