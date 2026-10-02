import '../scriptInit'

import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { CacheController } from 'server/cache/controller'
import { BaseProtocol, DB } from 'server/db/db'

import { Failures } from './common/failures'
import { Failure } from './common/types'
import { validateDataSources } from './validateDataSources'
import { validateLinks } from './validateLinks'
import { validateNationalDataPoints } from './validateNationalDataPoints'
import { validateTableData } from './validateTableData'

// Run order matters: links must run last.
// Descriptions are validated by validateLinks, since their only validations are link validations.
const validators = [validateTableData, validateDataSources, validateNationalDataPoints, validateLinks]

export const validateAll = async (client: BaseProtocol = DB): Promise<void> => {
  // Rebuild the validation dependency graph before running validations.
  await CacheController.generateMetaCache({}, client)

  const failures: Array<Failure> = []

  await Promises.each(validators, async (validator) => {
    failures.push(...(await validator(client)))
  })

  Failures.throwIfFailed('validateAll', failures)
}

if (require.main === module) {
  ToolsUtils.exec(validateAll)
}
