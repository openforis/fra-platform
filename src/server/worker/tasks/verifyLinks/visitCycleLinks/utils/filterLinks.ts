import { Link, LinkToVisit } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

type Props = {
  approvedLinks: Array<Link>
  linksToVisit: Array<LinkToVisit>
}

export const filterLinks = (props: Props): Array<LinkToVisit> => {
  const { approvedLinks, linksToVisit } = props

  const approvedLinkKeys = new Set<string>(approvedLinks.map(Links.getKey))
  return linksToVisit.filter((link) => !approvedLinkKeys.has(Links.getKey(link)))
}
