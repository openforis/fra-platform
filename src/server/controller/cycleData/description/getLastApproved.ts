import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { getInfo } from 'server/controller/cycleData/history/lastApproved'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
}

export const getLastApproved = async (props: Props, client: BaseProtocol = DB): Promise<DescriptionCountryValues> => {
  const { assessment, countryIso, cycle, sectionName } = props
  const info = await getInfo(props)

  if (Objects.isNil(info)) return { [countryIso]: { [sectionName]: {} } }
  const { lastAccepted, prevCycle } = info

  let data: DescriptionCountryValues = {} as DescriptionCountryValues

  if (!Objects.isNil(prevCycle)) {
    const countryISOs = [countryIso]
    const sectionNames = [sectionName]
    data = await DescriptionRepository.getValues({ assessment, countryISOs, cycle: prevCycle, sectionNames }, client)
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
