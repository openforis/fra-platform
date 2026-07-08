import { CommentableDescription } from 'meta/assessment/descriptionValue'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

import { buildVisitedLinksByKey } from 'server/worker/tasks/verifyLinks/utils/buildVisitedLinksByKey'
import { getLinkValidationMessage } from 'server/worker/tasks/verifyLinks/utils/getLinkValidationMessage'

import { buildInitialDescriptionValidations } from './buildInitialDescriptionValidations'
import { updateLocationValidation } from './updateLocationValidation'

type Props = {
  approvedLinks: Array<Link>
  initialDescriptions?: Array<Omit<CommentableDescription, 'id'>>
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
}

export const buildDescriptionLinkValidations = (props: Props): RecordDescriptionValidations => {
  const { approvedLinks, initialDescriptions = [], linkVisits, linksToVisit } = props

  // Start from a clean validation state for the edited descriptions,
  // so old link errors disappear when links are fixed or removed.
  const descriptionValidations = buildInitialDescriptionValidations(initialDescriptions)

  const approvedLinkKeys = new Set<string>(approvedLinks.map(Links.getKey))
  const visitedLinksByKey = buildVisitedLinksByKey({ linkVisits })

  linksToVisit.forEach((linkToVisit) => {
    const linkValidationMessage = getLinkValidationMessage({ approvedLinkKeys, linkToVisit, visitedLinksByKey })

    linkToVisit.locations.forEach((location) => {
      updateLocationValidation({ descriptionValidations, linkValidationMessage, location })
    })
  })

  return descriptionValidations
}
