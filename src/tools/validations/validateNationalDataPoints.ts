import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { validateCountryNationalDataPoints } from 'server/controller/cycleData/validations/nationalDataPoint/validateCountryNationalDataPoints'
import { BaseProtocol, DB } from 'server/db/db'

import { _validateCountries, CountryProps } from './_validateCountries'
import { Failures } from './failures'
import { Failure } from './types'

const toolName = 'validateNationalDataPoints'

const validateCountry = async (props: CountryProps, client: BaseProtocol): Promise<void> => {
  const { assessment, country, cycle } = props

  await validateCountryNationalDataPoints({ assessment, country, cycle }, client)
}

export const validateNationalDataPoints = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  return _validateCountries(
    {
      shouldValidateCycle: (cycle) => Boolean(cycle.props.ndp),
      toolName,
      validateCountry,
    },
    client
  )
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateNationalDataPoints()))
}
