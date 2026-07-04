import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

import { buildVisitedLinksByKey } from 'server/worker/tasks/verifyLinks/utils/buildVisitedLinksByKey'
import { getLinkValidationMessage } from 'server/worker/tasks/verifyLinks/utils/getLinkValidationMessage'

import { updateNationalDataPointLocationValidation } from './updateNationalDataPointLocationValidation'

type Props = {
  approvedLinks: Array<Link>
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
}

export const buildNationalDataPointLinkValidations = (props: Props): RecordNDPValidations => {
  const { approvedLinks, linkVisits, linksToVisit } = props

  const nationalDataPointValidations: RecordNDPValidations = {}

  const approvedLinkKeys = new Set<string>(approvedLinks.map(Links.getKey))
  const visitedLinksByKey = buildVisitedLinksByKey({ linkVisits })

  linksToVisit.forEach((linkToVisit) => {
    const linkValidationMessage = getLinkValidationMessage({ approvedLinkKeys, linkToVisit, visitedLinksByKey })

    linkToVisit.locations.forEach((location) => {
      updateNationalDataPointLocationValidation({ linkValidationMessage, location, nationalDataPointValidations })
    })
  })

  return nationalDataPointValidations
}
