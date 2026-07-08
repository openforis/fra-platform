import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { notifyDescriptionValidationUpdate } from 'server/controller/cycleData/validations/descriptions/notifyDescriptionValidationUpdate'

import { buildDescriptionLinkValidations } from './buildDescriptionLinkValidations'

type Props = {
  approvedLinks: Array<Link>
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptions: Array<Omit<CommentableDescription, 'id'>>
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
  notifyClients?: boolean
  sectionNames: Array<SectionName>
}

// Rebuilds description link validations, saves them in the cache and notifies clients.
export const refreshDescriptionValidations = async (props: Props): Promise<void> => {
  const { approvedLinks, assessment, countryIso, cycle, descriptions, linkVisits, linksToVisit, sectionNames } = props
  const { notifyClients = true } = props

  if (Objects.isEmpty(sectionNames)) return

  const descriptionValidations = buildDescriptionLinkValidations({
    approvedLinks,
    initialDescriptions: descriptions,
    linkVisits,
    linksToVisit,
  })

  const currentValidations = await DescriptionValidationRedisRepository.getValidations({
    assessment,
    countryIso,
    cycle,
    sectionNames,
  })

  // Emptied sections are still included in the notification, so clients clear them too.
  const validations: RecordDescriptionValidations = {}
  const validationsToSet: RecordDescriptionValidations = {}
  const sectionNamesToDelete: Array<SectionName> = []

  sectionNames.forEach((sectionName) => {
    const current = currentValidations[sectionName] ?? {}
    const update = descriptionValidations[sectionName] ?? {}
    const value = DescriptionValidations.mergeLinkValidations({ current, update })

    if (Objects.isEmpty(value)) {
      sectionNamesToDelete.push(sectionName)
    } else {
      validationsToSet[sectionName] = value
    }

    validations[sectionName] = value
  })

  await Promise.all([
    DescriptionValidationRedisRepository.setValidations({
      assessment,
      countryIso,
      cycle,
      descriptionValidations: validationsToSet,
    }),
    DescriptionValidationRedisRepository.deleteValidations({
      assessment,
      countryIso,
      cycle,
      sectionNames: sectionNamesToDelete,
    }),
  ])

  if (!notifyClients) return

  notifyDescriptionValidationUpdate({
    assessment,
    countryIso,
    cycle,
    descriptionValidations: validations,
    sectionNames,
  })
}
