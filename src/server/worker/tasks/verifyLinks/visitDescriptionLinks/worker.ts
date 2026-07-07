import { Sockets } from 'meta/socket/sockets'
import { Objects } from 'utils/objects'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { BaseProtocol, DB } from 'server/db/db'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

import { buildDescriptionLinkValidations } from './utils/buildDescriptionLinkValidations'
import { getDescriptionLinks } from './utils/getDescriptionLinks'
import { syncDescriptionLinks } from './utils/syncDescriptionLinks'
import { VerifyDescriptionLinksJob, VerifyDescriptionLinksJobProps } from './props'

export const runDescriptionLinkValidation = async (
  props: VerifyDescriptionLinksJobProps,
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, countryIso, cycle, descriptionIdentifiers, notifyClients = true } = props
  const logKey = `[visitDescriptionLinks] [${assessment.props.name}-${cycle.name}-${countryIso}]`
  const time = new Date().getTime()

  Logger.info(`${logKey} started.`)

  const { descriptions, linksToVisit } = await getDescriptionLinks(
    { assessment, countryIso, cycle, descriptionIdentifiers },
    client
  )

  if (Objects.isEmpty(descriptions)) {
    Logger.info(`${logKey} ended with no descriptions to validate.`)
    return
  }

  const { approvedLinks, linkVisits } = await syncDescriptionLinks({
    assessment,
    countryIso,
    cycle,
    descriptions,
    linksToVisit,
  })

  const descriptionValidations = buildDescriptionLinkValidations({
    approvedLinks,
    initialDescriptions: descriptions,
    linkVisits,
    linksToVisit,
  })

  const sectionNames = Array.from(new Set(descriptions.map(({ sectionName }) => sectionName)))

  await DescriptionValidationRedisRepository.setValidations({
    assessment,
    countryIso,
    cycle,
    descriptionValidations,
  })

  if (notifyClients) {
    const eventName = Sockets.getDescriptionValidationsUpdateEvent({
      assessmentName: assessment.props.name,
      countryIso,
      cycleName: cycle.name,
    })
    SocketServer.emit(eventName, { descriptionValidations, sectionNames })
  }

  const duration = (new Date().getTime() - time) / 1000
  Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
}

export default async (job: VerifyDescriptionLinksJob): Promise<void> => {
  try {
    await runDescriptionLinkValidation(job.data)
  } catch (error) {
    Logger.error(`[visitDescriptionLinks-workerThread] [job-${job.id}] Error.`)
    Logger.error(error)
    throw error
  }
}
