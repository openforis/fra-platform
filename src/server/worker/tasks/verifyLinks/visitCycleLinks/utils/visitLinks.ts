import { LinkToVisit, LinkValidationStatusCode, VisitedLink } from 'meta/cycleData/links/link'
import { Promises } from 'utils/promises'

import { parseLink } from './parseLink'
import { HostnameResolution, resolveHostname } from './resolveHostname'

const concurrentLookups = 25 // Maximum number of hostnames to resolve at a time.

export const visitLinks = async (linksToVisit: Array<LinkToVisit>): Promise<Array<VisitedLink>> => {
  const timestamp = Date.now().toString()
  const visitedLinks: Array<VisitedLink> = []

  // Group links by hostname, so every hostname is resolved only once per run.
  const linksByHostname = new Map<string, Array<LinkToVisit>>()
  linksToVisit.forEach((link) => {
    const parsedLink = parseLink(link.link)
    if ('code' in parsedLink) {
      visitedLinks.push({ ...link, code: parsedLink.code, timestamp })
      return
    }
    const hostnameLinks = linksByHostname.get(parsedLink.hostname) ?? []
    hostnameLinks.push(link)
    linksByHostname.set(parsedLink.hostname, hostnameLinks)
  })

  const hostnames = Array.from(linksByHostname.keys())
  const resolutions = new Map<string, HostnameResolution>()

  const resolveMany = async (targets: Array<string>): Promise<void> => {
    const results = await Promises.pool<string, HostnameResolution>(targets, resolveHostname, concurrentLookups)
    targets.forEach((hostname, index) => resolutions.set(hostname, results[index]))
  }

  const isTransient = (hostname: string): boolean => resolutions.get(hostname) === 'transient'

  await resolveMany(hostnames)
  await resolveMany(hostnames.filter(isTransient)) // Try the hostnames with transient errors a second time.

  hostnames.forEach((hostname) => {
    const isResolved = resolutions.get(hostname) === 'resolved'
    const code = isResolved ? LinkValidationStatusCode.success : LinkValidationStatusCode.enotfound
    const hostnameLinks = linksByHostname.get(hostname) ?? []
    hostnameLinks.forEach((link) => visitedLinks.push({ ...link, code, timestamp }))
  })

  return visitedLinks
}
