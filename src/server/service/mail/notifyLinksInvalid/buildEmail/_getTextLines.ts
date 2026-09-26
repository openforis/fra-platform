import { _getLinkLocationLinks } from './_getLinkLocationLinks'
import { CountryRenderProps, LinkRenderProps, RenderProps } from './types'

const _getLinkLines = (props: LinkRenderProps): string => {
  const { assessment, countryIso, cycle, link, subSections, t } = props
  const locationLines = _getLinkLocationLinks({ assessment, countryIso, cycle, link, subSections, t })
    .map(({ label, url }) => `      ${label}: ${url}`)
    .join('\n')
  return `    - ${link.link}${locationLines ? `\n${locationLines}` : ''}`
}

const _getCountryLines = (props: CountryRenderProps): string => {
  const { assessment, countryEntry, cycle, subSections, t } = props
  const { countryIso, countryLinksUrl, countryName, links } = countryEntry

  const invalidLinkCount = t('email.invalidLinks.invalidLinkCount', { count: links.length })
  const linkStatusPageInfo = t('email.invalidLinks.linkStatusPageInfo', { countryName })
  const linkLines = links
    .map((link) => _getLinkLines({ assessment, countryIso, cycle, link, subSections, t }))
    .join('\n')

  return `  ${countryName} (${countryIso}): ${invalidLinkCount}\n  ${linkStatusPageInfo}: ${countryLinksUrl}\n${linkLines}`
}

// Returns the text version of the body of the email
export const _getTextLines = (props: RenderProps): string => {
  const { assessment, countryEntries, cycle, subSections, t } = props
  return countryEntries
    .map((countryEntry) => _getCountryLines({ assessment, countryEntry, cycle, subSections, t }))
    .join('\n\n')
}
