import { Links } from 'meta/cycleData/links/links'

import { ProcessEnv } from 'server/utils'

import { LinkRenderProps, LocationLink } from './types'

export const _getLinkLocationLinks = (props: LinkRenderProps): Array<LocationLink> => {
  const { countryIso, cycle, isPanEuropean, link, subSections, t } = props
  return link.locations.reduce<Array<LocationLink>>((locationLinks, location) => {
    const label = Links.getLocationLabel({
      countryIso,
      cycle,
      includeCountryIso: false,
      isPanEuropean,
      location,
      subSections,
      t,
    })
    if (!label) return locationLinks
    return [...locationLinks, { label, url: `${ProcessEnv.appUri}${location.url}` }]
  }, [])
}
