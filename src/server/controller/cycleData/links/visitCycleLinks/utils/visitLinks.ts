import * as dns from 'dns'
import { Objects } from 'utils/objects'

import { LinkToVisit, LinkValidationStatusCode, VisitedLink } from 'meta/cycleData'

const _visitLink = async (link: string | null): Promise<LinkValidationStatusCode> => {
  if (Objects.isEmpty(link)) return LinkValidationStatusCode.empty

  if (
    link.startsWith('#_') ||
    link.startsWith('api/cycle-data/repository/file/') ||
    link.startsWith('/api/cycle-data/repository/file/')
  ) {
    return LinkValidationStatusCode.success
  }

  let hostname = ''
  try {
    const urlWithScheme = link.startsWith('www.') ? `http://${link}` : link
    const urlObject = new URL(urlWithScheme)
    hostname = urlObject.hostname
  } catch (_e) {
    return LinkValidationStatusCode.urlParsingError
  }

  return new Promise((resolve) => {
    dns.resolve(hostname, (err, addresses) => {
      if (err) resolve(LinkValidationStatusCode.enotfound)

      if (addresses?.length > 0) {
        resolve(LinkValidationStatusCode.success)
      } else {
        resolve(LinkValidationStatusCode.enotfound)
      }
    })
  })
}

export const visitLinks = async (links: Array<LinkToVisit>): Promise<Array<VisitedLink>> => {
  const dnsLookupCache = new Map<string, LinkValidationStatusCode>()
  const timestamp = Date.now().toString()
  const visitedLinks: Array<VisitedLink> = []
  const BATCH_SIZE = 50 // Preventing thousands of dns lookups at the same time

  const visitBatch = async (batch: Array<LinkToVisit>) => {
    const promises = batch.map(async (link) => {
      const cachedStatusCode = dnsLookupCache.get(link.link)
      if (cachedStatusCode !== undefined) {
        return { ...link, code: cachedStatusCode, timestamp }
      }

      const validationCode = await _visitLink(link.link)

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
