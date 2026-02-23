import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Link, LinkValidationStatusCode } from 'meta/cycleData/links/link'

import { LinkRepository } from 'server/db/repository/assessmentCycle/links'

type Props = {
  assessment: Assessment
  cycle: Cycle
  threshold: number
}

const codes = [
  LinkValidationStatusCode.enotfound,
  LinkValidationStatusCode.urlParsingError,
  LinkValidationStatusCode.empty,
]

const filters = { codes, approved: false }

// Return links grouped by country iso { ISO: Array<Link> }
export const groupLinksByCountry = async (props: Props): Promise<Record<CountryIso, Array<Link>>> => {
  const { assessment, cycle, threshold } = props

  const links = await LinkRepository.getMany({ assessment, cycle, filters })

  const grouped = Object.groupBy(links, (link) => link.countryIso)

  // Filter out by threshold
  return Object.fromEntries(
    Object.entries(grouped).filter(([, countryLinks]) => (countryLinks?.length ?? 0) > threshold)
  ) as Record<CountryIso, Array<Link>>
}
