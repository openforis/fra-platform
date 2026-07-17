import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { BaseProtocol, DB } from 'server/db/db'

import { Failures } from './common/failures'
import { Failure } from './common/types'
import { validateCountries } from './common/validateCountries'
import { validateCountryNationalDataPoints } from './nationalDataPoint/validateCountryNationalDataPoints'

const toolName = 'validateNationalDataPoints'

export const validateNationalDataPoints = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  return validateCountries(
    {
      shouldValidateCycle: (cycle) => Boolean(cycle.props.ndp),
      toolName,
      validateCountry: validateCountryNationalDataPoints,
    },
    client
  )
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateNationalDataPoints()))
}
