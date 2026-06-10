import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { ValidationMessage } from 'meta/assessment/validation/validation'
import { Link, LinkToVisit, LinkValidationStatusCode, VisitedLink } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { Objects } from 'utils/objects'

import { DescriptionLinkSource } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/types'

import { buildInitialDescriptionValidations } from './buildInitialDescriptionValidations'
import { updateLocationValidation } from './updateLocationValidation'

type Props = {
  approvedLinks: Array<Link>
  initialDescriptions?: Array<DescriptionLinkSource>
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
}

export const buildDescriptionLinkValidations = (props: Props): RecordDescriptionValidations => {
  const { approvedLinks, initialDescriptions = [], linkVisits, linksToVisit } = props

  // Start from a clean validation state for the edited descriptions,
  // so old link errors disappear when links are fixed or removed.
  const descriptionValidations = buildInitialDescriptionValidations(initialDescriptions)

  const approvedLinkKeys = new Set<string>(approvedLinks.map(Links.getKey))
  const visitedLinksByKey = linkVisits.reduce<Record<string, VisitedLink>>((acc, linkVisit) => {
    acc[Links.getKey(linkVisit)] = linkVisit
    return acc
  }, {})

  linksToVisit.forEach((linkToVisit) => {
    const linkKey = Links.getKey(linkToVisit)
    const approved = approvedLinkKeys.has(linkKey)
    const validationCode = visitedLinksByKey[linkKey]?.code

    let linkValidationMessage: ValidationMessage | undefined
    const isInvalid = !approved && validationCode !== undefined && validationCode !== LinkValidationStatusCode.success
    if (isInvalid) {
      const { link, name } = linkToVisit
      const invalidLinkLabel = !Objects.isEmpty(link) ? link : name

      linkValidationMessage = {
        key: 'generalValidation.invalidLinkWithReason',
        params: {
          link: invalidLinkLabel,
          reason: Links.getI18nValidationStatusLabelKey(validationCode),
        },
      }
    }

    linkToVisit.locations.forEach((location) => {
      updateLocationValidation({ descriptionValidations, linkValidationMessage, location })
    })
  })

  return descriptionValidations
}

export const buildDescriptionLinkValidationsByCountry = (
  props: Props
): Record<string, RecordDescriptionValidations> => {
  const { linksToVisit } = props

  const linksToVisitByCountry = linksToVisit.reduce<Record<string, Array<LinkToVisit>>>((acc, linkToVisit) => {
    const { countryIso } = linkToVisit
    acc[countryIso] ??= []
    acc[countryIso].push(linkToVisit)
    return acc
  }, {})

  return Object.entries(linksToVisitByCountry).reduce<Record<string, RecordDescriptionValidations>>(
    (acc, [countryIso, countryLinksToVisit]) => {
      acc[countryIso] = buildDescriptionLinkValidations({ ...props, linksToVisit: countryLinksToVisit })
      return acc
    },
    {}
  )
}
