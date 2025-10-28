import '../scriptInit'

import { DB } from 'server/db/db'
import { CacheController } from 'server/cache/controller'
import { RedisData } from 'server/cache/repository/redisData'
import { Logger } from 'server/utils/logger'

const exec = async (): Promise<void> => {
  await RedisData.getInstance().flushall()

  const assessments = await CacheController.generateAssessments()
  await CacheController.generateMetaCache({})

  await Promise.all(
    Object.values(assessments).map(async (assessment) => {
      // assessment and cycles metadata cache
      await CacheController.generateMetadata({ assessment })
      // cycles data cache
      await Promise.all(
        assessment.cycles.map(async (cycle) => {
          await CacheController.generateArea({ assessment, cycle })
          await CacheController.generateData({ assessment, cycle })
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
