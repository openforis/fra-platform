import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/routes/sectionNames'

import { LinksController } from 'server/controller/cycleData/links'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { Logger } from 'server/utils/logger'

import { filterLinks } from './utils/filterLinks'
import { mergeLinks } from './utils/mergeLinks'
import { visitLinks } from './utils/visitLinks'
import { VisitCycleLinksJob } from './props'

const _getLogKey = (job: VisitCycleLinksJob): string => {
  const { assessment, countryIso, cycle } = job.data

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const scope = countryIso ? `${assessmentName}-${cycleName}-${countryIso}` : `${assessmentName}-${cycleName}`
  return `[visitCycleLinks-workerThread] [${scope}] [job-${job.id}]`
}

export default async (job: VisitCycleLinksJob): Promise<void> => {
  const logKey = _getLogKey(job)
  try {
    const { assessment, countryIso, cycle, user } = job.data

    const target = { jobStatus: 'started' }
    const message = ActivityLogMessage.linksCheckStart
    const section = SectionNames.Admin.links
    const activityLog = { countryIso, message, section, target, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams)

    const time = new Date().getTime()
    Logger.info(`${logKey} started.`)

    const approvedLinksFilters = countryIso ? { approved: true, countries: [countryIso] } : { approved: true }

    const [linksToVisit, approvedLinks] = await Promise.all([
      LinksController.getAllLinksToVisit({ assessment, countryIso, cycle }),
      LinkRepository.getMany({ assessment, cycle, filters: approvedLinksFilters }),
    ])

    const mergedLinks = mergeLinks({ linksToVisit })

    await LinkRepository.markDeletedMany({
      assessment,
      countryIso,
      cycle,
      excludedLinks: mergedLinks.map((link) => ({
        countryIso: link.countryIso,
        link: link.link,
      })),
    })

    const linkVisits = await visitLinks(filterLinks({ approvedLinks, linksToVisit: mergedLinks }))

    await LinkRepository.upsertMany({
      assessment,
      cycle,
      linkVisits,
    })

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
    return Promise.resolve()
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}
