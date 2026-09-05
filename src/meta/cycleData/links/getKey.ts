import { LinkToVisit } from 'meta/cycleData/links/link'

export const getKey = (link: Pick<LinkToVisit, 'countryIso' | 'link'>): string =>
  `${link.countryIso}_${link.link ?? ''}`
