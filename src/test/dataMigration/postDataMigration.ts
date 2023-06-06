import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

import { add2025Columns } from 'test/dataMigration/steps/add2025Columns/add2025Columns'
import { cleanupCountryProps } from 'test/dataMigration/steps/cleanupCountryProps'
import { deleteAtlantisData } from 'test/dataMigration/steps/deleteAtlantisData/deleteAtlantisData'
import { deleteInvalid2025Nodes } from 'test/dataMigration/steps/deleteInvalid2025Nodes/deleteInvalid2025Nodes'
import { deleteWrongCalculatedNodes } from 'test/dataMigration/steps/deleteWrongCalculatedNodes'
import { metadataFix } from 'test/dataMigration/steps/metadataFix/metadataFix'
import { migrateBiomassAndCarbonStockData } from 'test/dataMigration/steps/migrateBiomassAndCarbonStockData'
import { migrateDescriptions } from 'test/dataMigration/steps/migrateDescriptions'
import { migrateMessageBoard } from 'test/dataMigration/steps/migrateMessageBoard'
import { migrateNodeExt } from 'test/dataMigration/steps/migrateNodeExt/migrateNodeExt'
import { migratePrimaryForestData } from 'test/dataMigration/steps/migratePrimaryForestData'
import { postMetadataFix } from 'test/dataMigration/steps/postMetadataFix/postMetadataFix'
import { updateCalculatedNodes } from 'test/dataMigration/steps/updateCalculatedNodes/updateCalculatedNodes'

const assessmentName = `fra`
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
    Logger.debug(`    ========== ${index} deleteWrongCalculatedNodes ${cycle.name}`)
    // eslint-disable-next-line no-await-in-loop
    await deleteWrongCalculatedNodes({ assessment, cycle }, client)

    index += 1
    Logger.debug(`    ========== ${index} migrateNodeExt ${cycle.name}`)
    // eslint-disable-next-line no-await-in-loop
    await migrateNodeExt({ assessment, cycle }, client)

    index += 1
    Logger.debug(`    ========== ${index} updateCalculatedNodes ${cycle.name}`)
    // eslint-disable-next-line no-await-in-loop
    await updateCalculatedNodes({ assessment, cycle }, client)

    // Logger.debug(`    ========== ${index} validateNodes ${cycle.name}`)
    // // eslint-disable-next-line no-await-in-loop
    // await validateNodes({ assessment, cycle }, client)

    index += 1
    Logger.debug(`    ========== ${index} cleanupCountryProps ${cycle.name}`)
    // eslint-disable-next-line no-await-in-loop
    await cleanupCountryProps({ assessment, cycle }, client)

    index += 1
    Logger.debug(`    ========== ${index} migrateDescriptions ${cycle.name}`)
    // eslint-disable-next-line no-await-in-loop
    await migrateDescriptions({ assessment, cycle }, client)
  })

const finalMigration = () =>
  test(`Final post migration`, async () => {
    const assessment = await AssessmentController.getOne({ assessmentName, metaCache: true }, client)

    index += 1
    Logger.debug(`    ========== ${index} migratePrimaryForestData `)
    await migratePrimaryForestData({ assessment }, client)

    index += 1
    Logger.debug(`    ========== ${index} migrateMessageBoard `)
    await migrateMessageBoard({ assessment }, client)

    index += 1
    Logger.debug(`    ========== ${index} postMetadataFix `)
    await postMetadataFix({ assessment }, client)

    index += 1
    Logger.debug(`    ========== ${index} deleteInvalid2025Nodes `)
    await deleteInvalid2025Nodes({ assessment }, client)

    index += 1
    Logger.debug(`    ========== ${index} deleteAtlantisData `)
    await deleteAtlantisData({ assessment }, client)
  })

describe(`Post Data migration`, () => {
  test(`Update node values`, async () => {
    Logger.debug(`========== START POST DATA MIGRATION `, start)

    // await DB.tx(async (client) => {
    const assessment = await AssessmentController.getOne({ assessmentName: `fra`, metaCache: true }, client)

    index += 1
    Logger.debug(`    ========== ${index}. add2025Columns`)
    await add2025Columns({ assessment }, client)

    index += 1
    Logger.debug(`    ========== ${index} metadataFix`)
    await metadataFix({ assessment }, client)

    index += 1
    Logger.debug(`    ========== ${index} migrateBiomassAndCarbonStockData`)
    await migrateBiomassAndCarbonStockData({ assessment }, client)
  })

  migrateCycle('2020')
  migrateCycle('2025')
  finalMigration()

  test(`LogEnd`, () => {
    const end = new Date().getTime()
    // eslint-disable-next-line no-console
    Logger.debug(`========== END `, end, `ELAPSED (s)`, (end - start) / 1000)
    process.exit(0)
  })
})
