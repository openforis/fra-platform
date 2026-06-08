import { Links } from 'meta/cycleData/links/links'

import { ProcessEnv } from 'server/utils'

import { LinkRenderProps, LocationLink } from './types'

export const _getLinkLocationLinks = (props: LinkRenderProps): Array<LocationLink> => {
  const { assessment, countryIso, cycle, link, subSections, t } = props
  return link.locations.reduce<Array<LocationLink>>((locationLinks, location) => {
    const label = Links.getLocationLabel({
      assessment,
      countryIso,
      cycle,
      includeCountryIso: false,
      location,
      subSections,
      t,
    })
    if (!label) return locationLinks
    return [...locationLinks, { label, url: `${ProcessEnv.appUri}${location.url}` }]
  }, [])
}
