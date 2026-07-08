import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { Logger } from 'server/utils/logger'

import { buildDescriptionLinks } from './utils/buildDescriptionLinks'
import { refreshDescriptionValidations } from './utils/refreshDescriptionValidations'
import { syncDescriptionLinks } from './utils/syncDescriptionLinks'
import { VerifyDescriptionLinksJob } from './props'

const _getLogKey = (job: VerifyDescriptionLinksJob): string => {
  const { assessment, countryIso, cycle } = job.data

  return `[visitDescriptionLinks-workerThread] [${assessment.props.name}-${cycle.name}-${countryIso}] [job-${job.id}]`
}

export default async (job: VerifyDescriptionLinksJob): Promise<void> => {
  const logKey = _getLogKey(job)

  try {
    const { assessment, countryIso, cycle, descriptionIdentifiers, notifyClients = true } = job.data
    const commonProps = { assessment, countryIso, cycle }
    const time = new Date().getTime()

    Logger.info(`${logKey} started.`)

    const descriptionValues = await DescriptionRepository.getValues({
      assessment,
      countryISOs: [countryIso],
      cycle,
      names: descriptionIdentifiers.map<CommentableDescriptionName>(({ name }) => name),
      sectionNames: descriptionIdentifiers.map<SectionName>(({ sectionName }) => sectionName),
    })

    const { descriptions, linksToVisit } = buildDescriptionLinks({
      ...commonProps,
      descriptionIdentifiers,
      descriptionValues,
    })

    if (Objects.isEmpty(descriptions)) {
      Logger.info(`${logKey} ended with no descriptions to validate.`)
      return
    }

    const { approvedLinks, linkVisits } = await syncDescriptionLinks({ ...commonProps, descriptions, linksToVisit })

    const sectionNames = Array.from(new Set(descriptions.map<SectionName>(({ sectionName }) => sectionName)))
    const props = { ...commonProps, approvedLinks, descriptions, linkVisits, linksToVisit, notifyClients, sectionNames }
    await refreshDescriptionValidations(props)

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    throw error
  }
}
