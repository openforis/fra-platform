import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { Objects } from 'utils/objects'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { notifyDescriptionValidationUpdate } from 'server/controller/cycleData/validations/descriptions/notifyDescriptionValidationUpdate'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { Logger } from 'server/utils/logger'

import { buildDescriptionLinks } from './utils/buildDescriptionLinks'
import { buildDescriptionLinkValidations } from './utils/buildDescriptionLinkValidations'
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
      assessment,
      countryIso,
      cycle,
      descriptionIdentifiers,
      descriptionValues,
    })

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

    // Merge the results onto the current state, so the other validations of the sections are kept.
    const currentValidations = await DescriptionValidationRedisRepository.getValidations({
      assessment,
      countryIso,
      cycle,
      sectionNames,
    })
    const validations: RecordDescriptionValidations = {}
    sectionNames.forEach((sectionName) => {
      const current = currentValidations[sectionName] ?? {}
      const update = descriptionValidations[sectionName] ?? {}
      validations[sectionName] = DescriptionValidations.mergeValidations({ current, update })
    })

    await DescriptionValidationRedisRepository.setValidations({
      assessment,
      countryIso,
      cycle,
      descriptionValidations: validations,
    })

    if (notifyClients) {
      notifyDescriptionValidationUpdate({ assessment, countryIso, cycle, descriptionValidations, sectionNames })
    }

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    throw error
  }
}
