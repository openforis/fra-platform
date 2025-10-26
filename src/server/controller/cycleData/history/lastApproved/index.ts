import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'

import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getInfo = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<HistoryLastApprovedInfo | undefined> => {
  const { assessment, countryIso, cycle } = props

  const country = await CountryRepository.getOne({ assessment, cycle, countryIso }, client)
  const lastAccepted = country.lastInAccepted as unknown as Date // server side is a Date object
  const prevCycle = cycle.cycleUuidSource ? Cycles.getPreviousCycle({ assessment, cycle }) : undefined

  if (!Objects.isEmpty(lastAccepted) || !Objects.isEmpty(prevCycle)) {
    return { lastAccepted, prevCycle }
  }

  return undefined
}

export const LastApproved = {
  getInfo,
}
