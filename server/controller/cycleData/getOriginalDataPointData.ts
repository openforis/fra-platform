import { BaseProtocol, DB } from '@server/db'
import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'
import { CycleDataRepository } from '@server/repository/cycleData'

export const getOriginalDataPointData = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<TableData> => {
  const { countryIso, assessment, cycle } = props

  return CycleDataRepository.getOriginalDataPointData(
    {
      assessment,
      cycle,
      countryIso,
    },
    client
  )
}
