import { Link, LinkToVisit } from 'meta/cycleData/link'

type Props = {
  approvedLinks: Array<Link>
  linksToVisit: Array<LinkToVisit>
}

export const mergeAndFilterLinks = (props: Props): Array<LinkToVisit> => {
  const { approvedLinks, linksToVisit } = props
  const approvedLinkKeys = new Set<string>(approvedLinks.map((link) => `${link.countryIso}_${link.link ?? ''}`))

  const mergedLinksMap = linksToVisit.reduce((acc, curr) => {
    const key = `${curr.countryIso}_${curr.link ?? ''}`

    if (approvedLinkKeys.has(key)) return acc

    if (!acc[key]) {
      // eslint-disable-next-line no-param-reassign
      acc[key] = { ...curr, locations: [...curr.locations] }
    } else {
      acc[key].locations.push(...curr.locations)
    }
    return acc
  }, {} as { [key: string]: LinkToVisit })

  return Object.values(mergedLinksMap)
}
