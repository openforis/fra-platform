import { Link, LinkToVisit } from 'meta/cycleData'

type Props = {
  approvedLinks: Array<Link>
  linksToVisit: Array<LinkToVisit>
}

export const filterLinks = (props: Props): Array<LinkToVisit> => {
  const { approvedLinks, linksToVisit } = props

  const approvedLinksSet = new Set<string>(approvedLinks.map((link) => `${link.countryIso}_${link.link ?? ''}`))
  return linksToVisit.filter((link) => !approvedLinksSet.has(`${link.countryIso}_${link.link ?? ''}`))
}
