import 'tsconfig-paths/register'
import 'dotenv/config'

import { AssessmentController } from 'server/controller/assessment'
import { UpdateDependenciesQueueFactory } from 'server/controller/cycleData/updateDependencies'
import { WorkerFactory } from 'server/controller/cycleData/updateDependencies/workerFactory'
import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

import { updateCalculatedNodes } from 'test/dataMigration/steps/updateCalculatedNodes/updateCalculatedNodes'
import { migrateCountryComments } from 'test/dataMigration/stepsPanEuropean/countryComments/migrateCountryComments'

const assessmentName = `panEuropean`
const client = DB
let index = 0
const start = new Date().getTime()

const close = async () => {
  // quick and dirty workaround to close redis connection after running integration tests
  // TODO: find a better strategy to handle Redis connections
  UpdateDependenciesQueueFactory.connection.quit()
  WorkerFactory.connection.quit()
  await DB.$pool.end()
}

const migrateCycle = async (cycleName: string) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache: true }, client)

  index += 1
  Logger.debug(`    ========== ${index} updateCalculatedNodes ${cycle.name}`)
  await updateCalculatedNodes({ assessment, cycle }, client)

  index += 1
  Logger.debug(`    ========== ${index} migrateCountryComments ${cycle.name}`)
  await migrateCountryComments({ assessment, cycle }, client)
}

const exec = async () => {
  Logger.debug(`========== START POST DATA MIGRATION `, start)

  // migrateCycle('2020')
  await migrateCycle('2025')

  await close()
}

exec().then(() => {
  const end = new Date().getTime()
  Logger.info(`========== panEuropean post data migration executed in ${(end - start) / 1000} (s)`)
})
