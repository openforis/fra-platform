import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Link, LinkLocation, LinkToVisit, LinkValidationStatusCode, VisitedLink } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

const _getLinkKey = (link: Pick<LinkToVisit, 'countryIso' | 'link'>): string => `${link.countryIso}_${link.link ?? ''}`

const _isDescriptionLocation = (
  location: LinkLocation
): location is Extract<LinkLocation, { descriptionName: string }> => 'descriptionName' in location

type Props = {
  approvedLinks: Array<Link>
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
}

export const buildDescriptionLinkValidations = (props: Props): RecordDescriptionValidations => {
  const { approvedLinks, linkVisits, linksToVisit } = props

  const approvedLinksSet = new Set<string>(approvedLinks.map(_getLinkKey))
  const linkVisitsByKey = linkVisits.reduce<Record<string, VisitedLink>>((acc, linkVisit) => {
    acc[_getLinkKey(linkVisit)] = linkVisit
    return acc
  }, {})

  return linksToVisit.reduce<RecordDescriptionValidations>((acc, linkToVisit) => {
    const linkKey = _getLinkKey(linkToVisit)
    const approved = approvedLinksSet.has(linkKey)
    const validationCode = linkVisitsByKey[linkKey]?.code
    const valid = approved || validationCode === LinkValidationStatusCode.success

    linkToVisit.locations.filter(_isDescriptionLocation).forEach((location) => {
      const { descriptionName, sectionName } = location
      const sectionValidation = (acc[sectionName] ??= { descriptions: {} })
      const descriptions = (sectionValidation.descriptions ??= {})
      const descriptionValidation = (descriptions[descriptionName as CommentableDescriptionName] ??= { valid: true })

      descriptionValidation.valid = descriptionValidation.valid && valid

      if (!valid && validationCode) {
        descriptionValidation.messages ??= []
        descriptionValidation.messages.push({ key: Links.getI18nValidationStatusLabelKey(validationCode) })
      }
    })

    return acc
  }, {})
}
