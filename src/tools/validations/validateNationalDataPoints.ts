import '../scriptInit'

import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AreaController } from 'server/controller/area'
import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { Failures } from './common/failures'
import { getAssessmentCycles } from './common/getAssessmentCycles'
import { Failure } from './common/types'
import { validateCycleCountries } from './common/validateCycleCountries'
import { validateCountryNationalDataPoints } from './nationalDataPoint/validateCountryNationalDataPoints'

const toolName = 'validateNationalDataPoints'

export const validateNationalDataPoints = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  const failures: Array<Failure> = []
  const assessmentCycles = await getAssessmentCycles(client)

  await Promises.each(assessmentCycles, async ({ assessment, cycle }) => {
    if (!cycle.props.ndp) return

    Logger.info(`${toolName}: ${assessment.props.name}/${cycle.name}`)

    const countries = await AreaController.getCountries({ assessment, cycle }, client)

    const cycleFailures = await validateCycleCountries({ assessment, countries, cycle, toolName }, (country) =>
      validateCountryNationalDataPoints({ assessment, country, cycle }, client)
    )
    failures.push(...cycleFailures)
  })

  return failures
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateNationalDataPoints()))
}
