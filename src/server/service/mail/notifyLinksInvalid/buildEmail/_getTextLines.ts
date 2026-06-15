import { _getLinkLocationLinks } from './_getLinkLocationLinks'
import { CountryRenderProps, LinkRenderProps, RenderProps } from './types'

const _getLinkLines = (props: LinkRenderProps): string => {
  const { countryIso, cycle, isPanEuropean, link, subSections, t } = props
  const locationLines = _getLinkLocationLinks({ countryIso, cycle, isPanEuropean, link, subSections, t })
    .map(({ label, url }) => `      ${label}: ${url}`)
    .join('\n')
  return `    - ${link.link}${locationLines ? `\n${locationLines}` : ''}`
}

const _getCountryLines = (props: CountryRenderProps): string => {
  const { countryEntry, cycle, isPanEuropean, subSections, t } = props
  const { countryIso, countryLinksUrl, countryName, links } = countryEntry

  const invalidLinkCount = t('email.invalidLinks.invalidLinkCount', { count: links.length })
  const linkStatusPageInfo = t('email.invalidLinks.linkStatusPageInfo', { countryName })
  const linkLines = links
    .map((link) => _getLinkLines({ countryIso, cycle, isPanEuropean, link, subSections, t }))
    .join('\n')

  return `  ${countryName} (${countryIso}): ${invalidLinkCount}\n  ${linkStatusPageInfo}: ${countryLinksUrl}\n${linkLines}`
}

// Returns the text version of the body of the email
export const _getTextLines = (props: RenderProps): string => {
  const { countryEntries, cycle, isPanEuropean, subSections, t } = props
  return countryEntries
    .map((countryEntry) => _getCountryLines({ countryEntry, cycle, isPanEuropean, subSections, t }))
    .join('\n\n')
}
