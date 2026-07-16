import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { BaseProtocol, DB } from 'server/db/db'

import { Failures } from './common/failures'
import { Failure } from './common/types'
import { validateCountries } from './common/validateCountries'
import { validateCountryTables } from './tables/validateCountryTables'

const toolName = 'validateTableData'

export const validateTableData = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  return validateCountries({ toolName, validateCountry: validateCountryTables }, client)
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateTableData()))
}
