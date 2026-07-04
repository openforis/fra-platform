import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { NDPLinkField } from 'meta/cycleData/links/nationalDataPointLink'
import { Objects } from 'utils/objects'

import { DB } from 'server/db/db'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { filterLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/filterLinks'
import { mergeLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/mergeLinks'
import { visitLinks } from 'server/worker/tasks/verifyLinks/visitCycleLinks/utils/visitLinks'

type DescriptionLocationToRemove = {
  descriptionName: CommentableDescriptionName
  path: Array<string>
  sectionName: string
}

type NationalDataPointLocationToRemove = {
  identifier: string
  odpSection: NDPLinkField
  sectionName: 'originalDataPoint'
}

type LocationToRemove = DescriptionLocationToRemove | NationalDataPointLocationToRemove

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  linksToVisit: Array<LinkToVisit>
  locations: Array<LocationToRemove>
}

type Returned = {
  approvedLinks: Array<Link>
  linkVisits: Array<VisitedLink>
}

// Keeps the link table locations aligned with the validated content:
// 1. Visit the links that are not approved.
// 2. When the content still contains links, update the database in one transaction: remove old locations and save the current ones.
export const syncLinks = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, linksToVisit: rawLinksToVisit, locations } = props

  const linksToVisit = mergeLinks({ linksToVisit: rawLinksToVisit }) // Merge duplicated links

  if (Objects.isEmpty(linksToVisit)) {
    // No links to visit means there may be old link rows pointing at these locations, so we remove them.
    await LinkRepository.removeLocations({ assessment, countryIso, cycle, locations })
    return { approvedLinks: [], linkVisits: [] }
  }

  // Include deleted approved rows, so a previously approved URL stays approved if it is added back.
  const filters = { approved: true, countries: [countryIso], excludeDeleted: false }
  const approvedLinks = await LinkRepository.getMany({ assessment, cycle, filters })
  const linkVisits = await visitLinks(filterLinks({ approvedLinks, linksToVisit }))

  // Replace the stale locations with the current ones in a single transaction.
  await DB.tx(async (client) => {
    await LinkRepository.removeLocations({ assessment, countryIso, cycle, locations }, client)
    await LinkRepository.upsertLinks({ assessment, cycle, linkVisits, linksToVisit }, client)
  })

  return { approvedLinks, linkVisits }
}
