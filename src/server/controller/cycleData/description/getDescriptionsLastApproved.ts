import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, DescriptionCountryValues } from 'meta/assessment'
import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'

import { BaseProtocol, DB } from 'server/db'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName?: string
  info: HistoryLastApprovedInfo
}

export const getDescriptionsLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<DescriptionCountryValues> => {
  const { info } = props
  const { prevCycle } = info

  if (!Objects.isNil(prevCycle)) {
    return DescriptionRepository.getValues({ ...props, cycle: prevCycle }, client)
  }

  return {} as DescriptionCountryValues
}
