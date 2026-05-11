import dns from 'dns'

import { LinkValidationStatusCode } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

export const validateLink = async (link: string | null): Promise<LinkValidationStatusCode> => {
  if (Objects.isEmpty(link)) return LinkValidationStatusCode.empty

  if (link.trim().toLowerCase().startsWith('mailto:')) {
    return LinkValidationStatusCode.success
  }

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
    // eslint-disable-next-line prefer-destructuring
    hostname = urlObject.hostname
  } catch (e) {
    return LinkValidationStatusCode.urlParsingError
  }

  return new Promise((resolve) => {
    dns.resolve(hostname, (err, addresses) => {
      if (err) {
        resolve(LinkValidationStatusCode.enotfound)
        return
      }

      if (addresses?.length > 0) {
        resolve(LinkValidationStatusCode.success)
      } else {
        resolve(LinkValidationStatusCode.enotfound)
      }
    })
  })
}
