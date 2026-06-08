import { _getLinkLocationLinks } from './_getLinkLocationLinks'
import { CountryRenderProps, LinkRenderProps, RenderProps } from './types'

const _getLinkItem = (props: LinkRenderProps): string => {
  const { countryIso, cycle, isPanEuropean, link, subSections, t } = props
  const locationItems = _getLinkLocationLinks({ countryIso, cycle, isPanEuropean, link, subSections, t })
    .map(({ label, url }) => `<li><a href="${url}">${label}</a></li>`)
    .join('')
  return `<li><a href="${link.link}">${link.link}</a>${locationItems ? `<ul>${locationItems}</ul>` : ''}</li>`
}

const _getCountryItem = (props: CountryRenderProps): string => {
  const { countryEntry, cycle, isPanEuropean, subSections, t } = props
  const { countryIso, countryLinksUrl, countryName, links } = countryEntry

  const invalidLinkCount = t('email.invalidLinks.invalidLinkCount', { count: links.length })
  const linkStatusPageInfo = t('email.invalidLinks.linkStatusPageInfo', { countryName })
  const linkItems = links
    .map((link) => _getLinkItem({ countryIso, cycle, isPanEuropean, link, subSections, t }))
    .join('')

  return `<li><strong>${countryName} (${countryIso})</strong>: ${invalidLinkCount}<br />${linkStatusPageInfo}: <a href="${countryLinksUrl}">${countryLinksUrl}</a><ul>${linkItems}</ul></li>`
}

// Returns the HTML body of the email
export const _getHtmlItems = (props: RenderProps): string => {
  const { countryEntries, cycle, isPanEuropean, subSections, t } = props
  return countryEntries
    .map((countryEntry) => _getCountryItem({ countryEntry, cycle, isPanEuropean, subSections, t }))
    .join('')
}
