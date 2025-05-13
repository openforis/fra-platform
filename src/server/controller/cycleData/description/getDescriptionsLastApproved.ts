import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'

import { getInfo } from 'server/controller/cycleData/history/lastApproved'
import { BaseProtocol, DB } from 'server/db'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
}

export const getDescriptionsLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<DescriptionCountryValues> => {
  const { assessment, countryIso, cycle, sectionName } = props
  const info = await getInfo(props)

  if (Objects.isNil(info)) return { [countryIso]: { [sectionName]: {} } }
  const { lastAccepted, prevCycle } = info

  let data: DescriptionCountryValues = {} as DescriptionCountryValues

  if (!Objects.isNil(prevCycle)) {
    data = await DescriptionRepository.getValues({ ...props, cycle: prevCycle }, client)
  }

  if (!Objects.isNil(lastAccepted)) {
    const lastApprovedData = await DescriptionRepository.getValuesLastApproved({
      assessment,
      cycle,
      countryIso,
      sectionName,
    })
    data = Objects.merge(data, lastApprovedData)
  }

  return data
}
