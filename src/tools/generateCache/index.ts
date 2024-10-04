import 'tsconfig-paths/register'
import 'dotenv/config'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { RedisData } from 'server/repository/redis/redisData'
import { Logger } from 'server/utils/logger'

const exec = async () => {
  await RedisData.getInstance().flushall()

  const assessments = await AssessmentController.getAll({})

  await AssessmentController.generateMetaCache()

  await Promise.all(
    assessments.map(async (assessment) => {
      // assessment and cycles metadata cache
      await AssessmentController.generateMetadataCache({ assessment })
      // cycles data cache
      await Promise.all(
        assessment.cycles.map(async (cycle) => {
          await AssessmentController.generateDataCache({ assessment, cycle })
        })
      )
    })
  )
}

const start = new Date().getTime()
Logger.debug(`========== START GENERATE CACHE ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  DB.$pool.end()
  process.exit(0)
})
