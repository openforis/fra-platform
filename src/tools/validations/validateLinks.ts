import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { Failures } from './failures'
import { Failure } from './types'

const toolName = 'validateLinks'

// Placeholder: links validation will be implemented separately.
export const validateLinks = async (_client: BaseProtocol = DB): Promise<Array<Failure>> => {
  Logger.info(`${toolName} is not implemented yet`)
  return []
}

if (require.main === module) {
  ToolsUtils.exec(async () => Failures.throwIfFailed(toolName, await validateLinks()))
}
