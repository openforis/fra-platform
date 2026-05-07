import { LinkToVisit, LinkValidationStatusCode, VisitedLink } from 'meta/cycleData/links/link'

import { validateLink } from 'server/controller/cycleData/links/validateLink'

export const visitLinks = async (links: Array<LinkToVisit>): Promise<Array<VisitedLink>> => {
  const dnsLookupCache = new Map<string, LinkValidationStatusCode>()
  const timestamp = Date.now().toString()
  const visitedLinks: Array<VisitedLink> = []
  const BATCH_SIZE = 50 // Preventing thousands of dns lookups at the same time

  const visitBatch = async (batch: Array<LinkToVisit>): Promise<Array<VisitedLink>> => {
    const promises = batch.map(async (link) => {
      const cachedStatusCode = dnsLookupCache.get(link.link)
      if (cachedStatusCode !== undefined) {
        return { ...link, code: cachedStatusCode, timestamp }
      }

      const validationCode = await validateLink(link.link)

      dnsLookupCache.set(link.link, validationCode)
      return { ...link, code: validationCode, timestamp }
    })

    return Promise.all(promises)
  }

  for (let i = 0; i < links.length; i += BATCH_SIZE) {
    const batch = links.slice(i, i + BATCH_SIZE)
    // eslint-disable-next-line no-await-in-loop
    const visitedBatch = await visitBatch(batch)
    visitedLinks.push(...visitedBatch)
  }

  return visitedLinks
}
