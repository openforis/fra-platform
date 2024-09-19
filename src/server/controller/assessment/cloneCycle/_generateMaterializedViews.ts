import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { TableData } from 'server/controller/cycleData/tableData'
import { BaseProtocol } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'

export const generateMaterializedViews = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleTarget } = props

  const countries = await CountryRepository.getMany({ assessment, cycle: cycleTarget }, client)

  await Promise.all([
    TableData.refreshViews({ assessment, cycle: cycleTarget }),
    CountrySummaryRepository.createMaterializedView({ assessment, cycle: cycleTarget }),
    ...countries.map(({ countryIso }) =>
      CountryActivityLogRepository.createMaterializedView({ assessment, cycle: cycleTarget, countryIso })
    ),
  ])
}
