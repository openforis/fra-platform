import { VisitedLink } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

type Props = {
  linkVisits: Array<VisitedLink>
}

export const buildVisitedLinksByKey = (props: Props): Record<string, VisitedLink> => {
  const { linkVisits } = props

  return linkVisits.reduce<Record<string, VisitedLink>>((acc, linkVisit) => {
    acc[Links.getKey(linkVisit)] = linkVisit
    return acc
  }, {})
}
