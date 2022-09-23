import { AssessmentController } from '@server/controller/assessment'
import { DB } from '@server/db'

import { add2025Columns } from '@test/dataMigration/steps/add2025Columns/add2025Columns'
import { cleanupCountryProps } from '@test/dataMigration/steps/cleanupCountryProps'
import { deleteWrongCalculatedNodes } from '@test/dataMigration/steps/deleteWrongCalculatedNodes'
import { metadataFix } from '@test/dataMigration/steps/metadataFix/metadataFix'
import { migrateDescriptions } from '@test/dataMigration/steps/migrateDescriptions'
import { migrateMessageBoard } from '@test/dataMigration/steps/migrateMessageBoard'
import { postMetadataFix } from '@test/dataMigration/steps/postMetadataFix/postMetadataFix'
import { updateCalculatedNodes } from '@test/dataMigration/steps/updateCalculatedNodes/updateCalculatedNodes'
import { validateNodes } from '@test/dataMigration/steps/validateNodes/validateNodes'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Post Data migration', () => {
  test('Update node values', async () => {
    await DB.tx(async (client) => {
      const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)
      await add2025Columns({ assessment }, client)
      await metadataFix({ assessment }, client)
      for (let i = 0; i < assessment.cycles.length; i += 1) {
        const cycle = assessment.cycles[i]
        // eslint-disable-next-line no-await-in-loop
        await deleteWrongCalculatedNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await updateCalculatedNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await validateNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await cleanupCountryProps({ assessment, cycle }, client)
      }
      await migrateDescriptions({ assessment }, client)
      await migrateMessageBoard({ assessment }, client)
      await postMetadataFix({ assessment }, client)
    })
    process.exit(0)
  })
})
