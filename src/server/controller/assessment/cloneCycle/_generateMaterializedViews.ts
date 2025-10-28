import { BaseProtocol } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { TableData } from 'server/controller/cycleData/tableData'

export const generateMaterializedViews = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleTarget } = props

  await TableData.refreshViews({ assessment, cycle: cycleTarget }, client)

  const countries = await CountryRepository.getMany({ assessment, cycle: cycleTarget }, client)
  await Promise.all([
    ...countries.map(({ countryIso }) =>
      CountryActivityLogRepository.createMaterializedView({ assessment, cycle: cycleTarget, countryIso }, client)
    ),
  ])
}
