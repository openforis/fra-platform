import 'tsconfig-paths/register'
import 'dotenv/config'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const close = async () => {
  await DB.$pool.end()
}

const exec = async () => {
  await AssessmentController.generateMetaCache()
  await close()
}

Logger.info('Meta cache generation starting')
exec().then(() => {
  Logger.info('Meta cache generated')
})
