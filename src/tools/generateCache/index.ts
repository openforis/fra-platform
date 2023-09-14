import 'tsconfig-paths/register'
import 'dotenv/config'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

import { generateDataCache } from './generateDataCache'
import { generateMetadataCache } from './generateMetadataCache'

const exec = async () => {
  const assessments = await AssessmentController.getAll({})

  await Promise.all(
    assessments.map(async (assessment) =>
      Promise.all(
        assessment.cycles.map(async (cycle) => {
          await generateMetadataCache({ assessment, cycle })
          await generateDataCache({ assessment, cycle })
        })
      )
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
