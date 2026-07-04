import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { DescriptionLinkLocationPath } from 'meta/cycleData/links/descriptionLink'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'

import { syncLinks } from 'server/worker/tasks/verifyLinks/utils/syncLinks'

type LocationToRefresh = {
  descriptionName: CommentableDescriptionName
  path: Array<string>
  sectionName: string
}

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptions: Array<Omit<CommentableDescription, 'id'>>
  linksToVisit: Array<LinkToVisit>
}

type Returned = {
  approvedLinks: Array<Link>
  linkVisits: Array<VisitedLink>
}

// Keeps the link table locations aligned with the validated descriptions. Builds the description
// locations to refresh, so stale locations can be removed even when no links remain.
export const syncDescriptionLinks = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, descriptions, linksToVisit } = props

  const locationPaths = [DescriptionLinkLocationPath.text, DescriptionLinkLocationPath.dataSourceReference]
  const locations = descriptions.flatMap(({ name, sectionName }) =>
    locationPaths.map<LocationToRefresh>((path) => ({ descriptionName: name, path, sectionName }))
  )

  return syncLinks({ assessment, countryIso, cycle, linksToVisit, locations })
}
