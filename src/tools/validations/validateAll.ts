import '../scriptInit'

import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { BaseProtocol, DB } from 'server/db/db'

import { Failures } from './failures'
import { Failure } from './types'
import { validateDescriptions } from './validateDescriptions'
import { validateLinks } from './validateLinks'
import { validateNationalDataPoints } from './validateNationalDataPoints'
import { validateTableData } from './validateTableData'

// Run order matters: links must run last.
const validators = [validateTableData, validateDescriptions, validateNationalDataPoints, validateLinks]

export const validateAll = async (client: BaseProtocol = DB): Promise<void> => {
  const failures: Array<Failure> = []

  await Promises.each(validators, async (validator) => {
    failures.push(...(await validator(client)))
  })

  Failures.throwIfFailed('validateAll', failures)
}

if (require.main === module) {
  ToolsUtils.exec(validateAll)
}
