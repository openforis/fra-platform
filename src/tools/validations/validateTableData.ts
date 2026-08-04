import '../scriptInit'

import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { TableRedisRepository } from 'server/cache/repository/table'
import { AreaController } from 'server/controller/area'
import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { Failures } from './common/failures'
import { getAssessmentCycles } from './common/getAssessmentCycles'
import { Failure } from './common/types'
import { validateCycleCountries } from './common/validateCycleCountries'
import { buildTablesNodes } from './tables/buildTablesNodes'
import { validateCountryTables } from './tables/validateCountryTables'

const toolName = 'validateTableData'

export const validateTableData = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  const failures: Array<Failure> = []
  const assessmentCycles = await getAssessmentCycles(client)

  await Promises.each(assessmentCycles, async ({ assessment, cycle }) => {
    Logger.info(`${toolName}: ${assessment.props.name}/${cycle.name}`)

    const countries = await AreaController.getCountries({ assessment, cycle }, client)
    // The node list does not depend on the countries, it only depends on the cycle, so it is calculated once here.
    const nodes = buildTablesNodes({ cycle, tables: await TableRedisRepository.getManyRecord({ assessment, cycle }) })

    const cycleFailures = await validateCycleCountries({ assessment, countries, cycle, toolName }, (country) =>
      validateCountryTables({ assessment, country, cycle, nodes })
    )
    failures.push(...cycleFailures)
  })

  return failures
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateTableData()))
}
