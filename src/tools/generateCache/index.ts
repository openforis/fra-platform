import 'tsconfig-paths/register'
import 'dotenv/config'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { RedisData } from 'server/repository/redis/redisData'
import { Logger } from 'server/utils/logger'

import { generateAssessmentCache } from './generateAssessmentCache'
import { generateDataCache } from './generateDataCache'
import { generateMetadataCache } from './generateMetadataCache'

const exec = async () => {
  await RedisData.getInstance().flushall()

  const assessments = await AssessmentController.getAll({})

  await Promise.all(
    assessments.map(async (assessment) =>
      Promise.all([
        // assessment cache
        generateAssessmentCache({ assessment }),
        // cycles cache
        Promise.all(
          assessment.cycles.map(async (cycle) => {
            await generateMetadataCache({ assessment, cycle })
            await generateDataCache({ assessment, cycle })
          })
        ),
      ])
    )
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
