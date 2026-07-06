import { ValidationMessage } from 'meta/assessment/validation/validation'
import { LinkToVisit, LinkValidationStatusCode, VisitedLink } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { Objects } from 'utils/objects'

type Props = {
  approvedLinkKeys: Set<string>
  linkToVisit: LinkToVisit
  visitedLinksByKey: Record<string, VisitedLink>
}

// Returns the invalid-link message for a link, or undefined when the link is approved or resolves.
export const getLinkValidationMessage = (props: Props): ValidationMessage | undefined => {
  const { approvedLinkKeys, linkToVisit, visitedLinksByKey } = props

  const linkKey = Links.getKey(linkToVisit)
  const approved = approvedLinkKeys.has(linkKey)
  const validationCode = visitedLinksByKey[linkKey]?.code

  const isInvalid = !approved && validationCode !== undefined && validationCode !== LinkValidationStatusCode.success
  if (!isInvalid) return undefined

  const { link, name } = linkToVisit
  const invalidLinkLabel = !Objects.isEmpty(link) ? link : name

  return {
    key: 'generalValidation.invalidLinkWithReason',
    params: {
      link: invalidLinkLabel,
      reason: Links.getI18nValidationStatusLabelKey(validationCode),
    },
  }
}
