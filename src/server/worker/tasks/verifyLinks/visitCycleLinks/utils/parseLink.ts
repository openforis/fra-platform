import { ApiEndPoint } from 'meta/api/endpoint'
import { LinkValidationStatusCode } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

type ParsedLink = { code: LinkValidationStatusCode } | { hostname: string }

const repositoryFilePrefix = ApiEndPoint.CycleData.Repository.File.one('') // '/api/cycle-data/repository/file/'

// Parses a link before resolving the hostname. Returns either a final status code or the hostname still to be resolved.
export const parseLink = (link: string | null): ParsedLink => {
  if (Objects.isEmpty(link)) return { code: LinkValidationStatusCode.empty }

  if (link.trim().toLowerCase().startsWith('mailto:')) {
    return { code: LinkValidationStatusCode.success }
  }

  const isRepositoryFileLink = link.startsWith(repositoryFilePrefix) || link.startsWith(repositoryFilePrefix.slice(1))
  if (link.startsWith('#_') || isRepositoryFileLink) {
    return { code: LinkValidationStatusCode.success }
  }

  try {
    const urlWithScheme = link.startsWith('www.') ? `http://${link}` : link
    const { hostname } = new URL(urlWithScheme)
    return { hostname }
  } catch (e) {
    return { code: LinkValidationStatusCode.urlParsingError }
  }
}
