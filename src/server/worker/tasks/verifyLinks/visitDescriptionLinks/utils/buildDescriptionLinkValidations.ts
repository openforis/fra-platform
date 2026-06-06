import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Link, LinkLocation, LinkToVisit, LinkValidationStatusCode, VisitedLink } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { Objects } from 'utils/objects'

const _isDescriptionTextLocation = (
  location: LinkLocation
): location is Extract<LinkLocation, { descriptionName: string }> => {
  return 'descriptionName' in location && location.path.length === 1 && location.path[0] === 'text'
}

const _getInvalidLinkLabel = (linkToVisit: LinkToVisit): string => {
  const { link, name } = linkToVisit

  if (!Objects.isEmpty(link)) return link
  if (!Objects.isEmpty(name)) return name

  return ''
}

type Props = {
  approvedLinks: Array<Link>
  initialDescriptions?: Array<CommentableDescription>
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
}

export const buildDescriptionLinkValidations = (props: Props): RecordDescriptionValidations => {
  const { approvedLinks, initialDescriptions = [], linkVisits, linksToVisit } = props

  const approvedLinksSet = new Set<string>(approvedLinks.map(Links.getKey))
  const linkVisitsByKey = linkVisits.reduce<Record<string, VisitedLink>>((acc, linkVisit) => {
    acc[Links.getKey(linkVisit)] = linkVisit
    return acc
  }, {})

  // Mark the validated descriptions as valid first, so removing the last invalid link clears the previous error.
  const initialValidations = initialDescriptions.reduce<RecordDescriptionValidations>((acc, description) => {
    const { name, sectionName } = description
    const sectionValidation = (acc[sectionName] ??= { descriptions: {} })
    sectionValidation.descriptions ??= {}
    sectionValidation.descriptions[name] = { valid: true }
    return acc
  }, {})

  return linksToVisit.reduce<RecordDescriptionValidations>((acc, linkToVisit) => {
    const linkKey = Links.getKey(linkToVisit)
    const approved = approvedLinksSet.has(linkKey)
    const validationCode = linkVisitsByKey[linkKey]?.code
    const valid = approved || validationCode === LinkValidationStatusCode.success

    linkToVisit.locations.filter(_isDescriptionTextLocation).forEach((location) => {
      const { descriptionName, sectionName } = location
      const sectionValidation = (acc[sectionName] ??= { descriptions: {} })
      const descriptions = (sectionValidation.descriptions ??= {})
      const descriptionValidation = (descriptions[descriptionName as CommentableDescriptionName] ??= { valid: true })

      descriptionValidation.valid = descriptionValidation.valid && valid

      if (!valid && validationCode) {
        descriptionValidation.messages ??= []
        descriptionValidation.messages.push({
          key: 'generalValidation.invalidLinkWithReason',
          params: {
            link: _getInvalidLinkLabel(linkToVisit),
            reason: Links.getI18nValidationStatusLabelKey(validationCode),
          },
        })
      }
    })

    return acc
  }, initialValidations)
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
