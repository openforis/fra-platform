import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { NationalDataPointLinkLocationKey, NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'

import { syncLinks } from 'server/worker/tasks/verifyLinks/utils/syncLinks'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  linksToVisit: Array<LinkToVisit>
  targets: Array<NDPLinkTarget>
}

type Returned = {
  approvedLinks: Array<Link>
  linkVisits: Array<VisitedLink>
}

// Keeps the link table locations aligned with the validated national data points. Builds the national
// data point locations to refresh, so stale locations can be removed even when no links remain.
export const syncNationalDataPointLinks = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, linksToVisit, targets } = props

  const locations = targets.flatMap((target) =>
    target.fields.map<NationalDataPointLinkLocationKey>((field) => ({
      odpSection: field,
      odpUuid: target.odpUuid,
      sectionName: 'originalDataPoint',
    }))
  )

  return syncLinks({ assessment, countryIso, cycle, linksToVisit, locations })
}
