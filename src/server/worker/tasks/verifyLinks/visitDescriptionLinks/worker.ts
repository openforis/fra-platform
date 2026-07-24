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
    const { assessment, countryIso, cycle, descriptionKeys, notifyClients = true } = job.data
    const commonProps = { assessment, countryIso, cycle }
    const time = new Date().getTime()

    Logger.info(`${logKey} started.`)

    const sectionNames = Array.from(new Set(descriptionKeys.map<SectionName>(({ sectionName }) => sectionName)))

    const descriptionValues = await DescriptionRepository.getValues({
      assessment,
      countryISOs: [countryIso],
      cycle,
      names: descriptionKeys.map<CommentableDescriptionName>(({ name }) => name),
      sectionNames,
    })

    const { descriptions, linksToVisit } = buildDescriptionLinks({
      ...commonProps,
      descriptionKeys,
      descriptionValues,
    })

    if (Objects.isEmpty(descriptions)) {
      Logger.info(`${logKey} ended with no descriptions to validate.`)
      return
    }

    const { approvedLinks, linkVisits } = await syncDescriptionLinks({ ...commonProps, descriptions, linksToVisit })

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
