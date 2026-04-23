import { validateAll } from 'tools/validations/validateAllRunner'

import { CacheController } from 'server/cache/controller'
import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  await CacheController.generateMetaCache({}, client)
  await validateAll(client)
}
