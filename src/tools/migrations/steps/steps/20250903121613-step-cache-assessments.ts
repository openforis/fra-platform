import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB } from 'server/db'

export default async (client: BaseProtocol): Promise<void> => {
  await DB.query(`alter table public.assessment drop column meta_cache;`)
  await CacheController.generateAssessments(client)
  await CacheController.generateMetaCache({}, client)
}
