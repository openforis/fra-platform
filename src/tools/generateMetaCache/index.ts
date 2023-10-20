import 'tsconfig-paths/register'
import 'dotenv/config'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const client = DB

const close = async () => {
  await DB.$pool.end()
}

const exec = async () => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)
  await Promise.all(
    assessments.map((assessment) => {
      Logger.debug(`\t---- Generating meta cache for assessment ${assessment.props.name}`)
      return Promise.all(
        assessment.cycles.map(async (cycle) => {
          await AssessmentController.generateMetaCache({ assessment, cycle }, client)
          Logger.debug(`\t\t----\tGenerated meta cache for cycle ${assessment.props.name}-${cycle.name}`)
        })
      )
    })
  )
  await close()
}

Logger.info('Meta cache generation starting')
exec().then(() => {
  Logger.info('Meta cache generated')
})
