import { Promises } from 'utils/promises'

import { BaseProtocol, DB } from 'server/db'
import { CacheController } from 'server/cache/controller'

export default async (client: BaseProtocol): Promise<void> => {
  await DB.query(`alter table public.assessment drop column if exists meta_cache;`)
  const assessments = await CacheController.generateAssessments(client)
  await CacheController.generateMetaCache({}, client)

  await Promises.each(Object.values(assessments), async (assessment) => {
    await CacheController.generateMetadata({ assessment }, client)
  })
}
