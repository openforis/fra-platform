import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { validateCountryTables } from 'server/controller/cycleData/validations/tables/validateCountryTables/validateCountryTables'
import { BaseProtocol, DB } from 'server/db/db'

import { _validateCountries } from './_validateCountries'
import { Failures } from './failures'
import { Failure } from './types'

const toolName = 'validateTableData'

export const validateTableData = async (client: BaseProtocol = DB): Promise<Array<Failure>> => {
  return _validateCountries({ toolName, validateCountry: validateCountryTables }, client)
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateTableData()))
}
