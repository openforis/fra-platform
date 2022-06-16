import { deleteWrongCalculatedNodes } from '@test/dataMigration/steps/deleteWrongCalculatedNodes'
import { updateCalculatedNodes } from '@test/dataMigration/steps/updateCalculatedNodes/updateCalculatedNodes'
import { validateNodes } from '@test/dataMigration/steps/validateNodes/validateNodes'

import { AssessmentController } from '@server/controller/assessment'
import { DB } from '@server/db'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Post Data migration', () => {
  test('Update node values', async () => {
    await DB.tx(async (client) => {
      const assessment = await AssessmentController.getOne({ name: 'fra', metaCache: true }, client)
      for (let i = 0; i < assessment.cycles.length; i += 1) {
        const cycle = assessment.cycles[i]
        // eslint-disable-next-line no-await-in-loop
        await deleteWrongCalculatedNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await updateCalculatedNodes({ assessment, cycle }, client)
        // eslint-disable-next-line no-await-in-loop
        await validateNodes({ assessment, cycle }, client)
      }
    })
    process.exit(0)
  })
})
