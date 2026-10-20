import { _getLinkLocationLinks } from './_getLinkLocationLinks'
import { CountryRenderProps, LinkRenderProps, RenderProps } from './types'

const _getLinkItem = (props: LinkRenderProps): string => {
  const { assessment, countryIso, cycle, link, subSections, t } = props
  const locationItems = _getLinkLocationLinks({ assessment, countryIso, cycle, link, subSections, t })
    .map(({ label, url }) => `<li><a href="${url}">${label}</a></li>`)
    .join('')
  return `<li><a href="${link.link}">${link.link}</a>${locationItems ? `<ul>${locationItems}</ul>` : ''}</li>`
}

const _getCountryItem = (props: CountryRenderProps): string => {
  const { assessment, countryEntry, cycle, subSections, t } = props
  const { countryIso, countryLinksUrl, countryName, links } = countryEntry

  const invalidLinkCount = t('email.invalidLinks.invalidLinkCount', { count: links.length })
  const linkStatusPageInfo = t('email.invalidLinks.linkStatusPageInfo', { countryName })
  const linkItems = links.map((link) => _getLinkItem({ assessment, countryIso, cycle, link, subSections, t })).join('')

  return `<li><strong>${countryName} (${countryIso})</strong>: ${invalidLinkCount}<br />${linkStatusPageInfo}: <a href="${countryLinksUrl}">${countryLinksUrl}</a><ul>${linkItems}</ul></li>`
}

// Returns the HTML body of the email
export const _getHtmlItems = (props: RenderProps): string => {
  const { assessment, countryEntries, cycle, subSections, t } = props
  return countryEntries
    .map((countryEntry) => _getCountryItem({ assessment, countryEntry, cycle, subSections, t }))
    .join('')
}
