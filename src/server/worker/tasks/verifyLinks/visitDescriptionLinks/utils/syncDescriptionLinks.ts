import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, DescriptionIdentifier } from 'meta/assessment/descriptionValue'
import { DescriptionLinkLocationPath } from 'meta/cycleData/links/descriptionLink'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import { DB } from 'server/db/db'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { filterLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/filterLinks'
import { mergeLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/mergeLinks'
import { visitLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/visitLinks'

type LocationToRefresh = DescriptionIdentifier & {
  path: Array<string>
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

// Keeps link table locations aligned with the validated descriptions:
// 1. Build the description locations to refresh, so stale locations can be removed even when no links remain.
// 2. Visit the links that are not approved.
// 3. When the descriptions still contain links, update the database in one transaction: remove old locations and save the current ones.
export const syncDescriptionLinks = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, descriptions, linksToVisit: rawLinksToVisit } = props

  const locationPaths = [DescriptionLinkLocationPath.text, DescriptionLinkLocationPath.dataSourceReference]
  const locations = descriptions.flatMap(({ name, sectionName }) =>
    locationPaths.map<LocationToRefresh>((path) => ({ name, path, sectionName }))
  )
  const linksToVisit = mergeLinks({ linksToVisit: rawLinksToVisit }) // Merge duplicated links

  if (Objects.isEmpty(linksToVisit)) {
    // No links to visit means there may be old link rows pointing at these descriptions, so we remove them.
    await LinkRepository.removeLocations({ assessment, countryIso, cycle, locations })
    return { approvedLinks: [], linkVisits: [] }
  }

  // Include deleted approved rows, so a previously approved URL stays approved if it is added back.
  const filters = { approved: true, countries: [countryIso], excludeDeleted: false }
  const approvedLinks = await LinkRepository.getMany({ assessment, cycle, filters })
  const linkVisits = await visitLinks(filterLinks({ approvedLinks, linksToVisit }))

  // Replace stale description locations with the current ones in a single transaction.
  await DB.tx(async (client) => {
    await LinkRepository.removeLocations({ assessment, countryIso, cycle, locations }, client)
    await LinkRepository.upsertDescriptionLinks({ assessment, cycle, linkVisits, linksToVisit }, client)
  })

  return { approvedLinks, linkVisits }
}
