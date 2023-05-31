import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

import { updateCalculatedNodes } from 'test/dataMigration/steps/updateCalculatedNodes/updateCalculatedNodes'
import { migrateCountryComments } from 'test/dataMigration/stepsPanEuropean/countryComments/migrateCountryComments'

const assessmentName = `panEuropean`
const client = DB
let index = 0
const start = new Date().getTime()

afterAll(async () => {
  await DB.$pool.end()
})

const migrateCycle = (cycleName: string) =>
  test(`Cycle ${cycleName} migration`, async () => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle(
      { assessmentName, cycleName, metaCache: true },
      client
    )

    index += 1
    Logger.debug(`    ========== ${index} updateCalculatedNodes ${cycle.name}`)
    await updateCalculatedNodes({ assessment, cycle }, client)

    index += 1
    Logger.debug(`    ========== ${index} migrateCountryComments ${cycle.name}`)
    await migrateCountryComments({ assessment, cycle }, client)
  })

describe(`Post Data migration`, () => {
  test(`LogStart`, async () => {
    Logger.debug(`========== START POST DATA MIGRATION `, start)
  })

  // migrateCycle('2020')
  migrateCycle('2025')

  test(`LogEnd`, () => {
    const end = new Date().getTime()
    Logger.debug(`========== END `, end, `ELAPSED (s)`, (end - start) / 1000)
    process.exit(0)
  })
})
