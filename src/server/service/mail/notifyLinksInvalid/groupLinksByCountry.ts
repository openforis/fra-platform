import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinkValidationStatusCode } from 'meta/cycleData/links/link'

import { LinkRepository } from 'server/db/repository/assessmentCycle/links'

import { LinksByCountry } from './types'

type Props = {
  assessment: Assessment
  cycle: Cycle
  threshold: number
}

const codes = [
  LinkValidationStatusCode.emailParsingError,
  LinkValidationStatusCode.enotfound,
  LinkValidationStatusCode.urlParsingError,
  LinkValidationStatusCode.empty,
]

const filters = { codes, approved: false }

// Return links grouped by country iso { ISO: Array<Link> }
export const groupLinksByCountry = async (props: Props): Promise<LinksByCountry> => {
  const { assessment, cycle, threshold } = props

  const links = await LinkRepository.getMany({ assessment, cycle, filters })

  const grouped = Object.groupBy(links, (link) => link.countryIso)

  // Filter out by threshold
  return Object.fromEntries(
    Object.entries(grouped).filter(([, countryLinks]) => (countryLinks?.length ?? 0) >= threshold)
  ) as LinksByCountry
}
