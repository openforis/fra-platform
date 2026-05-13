import { LinkToVisit } from 'meta/cycleData/links/link'
import { Routes } from 'meta/routes/routes'
import { Sockets } from 'meta/socket/sockets'
import { Htmls } from 'utils/htmls'

// import { ValidationRedisRepository } from 'server/cache/repository/validation'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'
import { filterLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/filterLinks'
import { mergeLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/mergeLinks'
import { visitLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/visitLinks'

import { buildDescriptionLinkValidations } from './utils/buildDescriptionLinkValidations'
import { VerifyDescriptionLinksJob } from './props'

const _getLogKey = (job: VerifyDescriptionLinksJob): string => {
  const { assessment, countryIso, cycle } = job.data

  return `[visitDescriptionLinks-workerThread] [${assessment.props.name}-${cycle.name}-${countryIso}] [job-${job.id}]`
}

const _getLinksToVisit = async (job: VerifyDescriptionLinksJob): Promise<Array<LinkToVisit>> => {
  const { assessment, countryIso, cycle, descriptionIds } = job.data

  const descriptions = await DescriptionRepository.getManyByIds({
    assessment,
    countryIso,
    cycle,
    ids: descriptionIds,
  })

  return descriptions.flatMap((description) => {
    const { id, name, sectionName, value } = description
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, sectionName }
    const url = Routes.Section.generatePath(urlParams)
    const locations = [{ colName: 'value', descriptionName: name, id, path: ['text'], sectionName, url }]

    return Htmls.getLinks(value.text).map(({ link, name: linkName }) => ({
      countryIso,
      link: link ?? '',
      locations,
      name: linkName,
    }))
  })
}

export default async (job: VerifyDescriptionLinksJob): Promise<void> => {
  const logKey = _getLogKey(job)

  try {
    const { assessment, countryIso, cycle } = job.data
    const time = new Date().getTime()

    Logger.info(`${logKey} started.`)

    const linksToVisit = mergeLinks({ linksToVisit: await _getLinksToVisit(job) })
    if (linksToVisit.length === 0) {
      Logger.info(`${logKey} ended with no current links to visit.`)
      return
    }

    const approvedLinks = await LinkRepository.getMany({
      assessment,
      cycle,
      filters: { approved: true, countries: [countryIso] },
    })
    const linkVisits = await visitLinks(filterLinks({ approvedLinks, linksToVisit }))

    await LinkRepository.upsertDescriptionLinks({
      assessment,
      cycle,
      linkVisits,
      linksToVisit,
    })

    const descriptionValidations = buildDescriptionLinkValidations({ approvedLinks, linkVisits, linksToVisit })
    // TODO Next PR: await ValidationRedisRepository.setDescriptionValidations({
    //   assessment,
    //   countryIso,
    //   cycle,
    //   descriptionValidations,
    // })

    const eventName = Sockets.getDescriptionLinksValidationUpdateEvent({
      assessmentName: assessment.props.name,
      countryIso,
      cycleName: cycle.name,
    })
    SocketServer.emit(eventName, { countryIso, descriptionValidations })

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    throw error
  }
}
