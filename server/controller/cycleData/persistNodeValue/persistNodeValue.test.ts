import { DB } from '@server/db'
import { AssessmentController, UserController } from '@server/controller'
import { CycleDataController } from '@server/controller/cycleData'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Persist value test', () => {
  test('test', async () => {
    const assessment = await AssessmentController.getOne({ name: 'fra', metaCache: true })
    const user = await UserController.read({ user: { email: 'cosimo.togna@fao.org' } })

    await CycleDataController.persistNodeValue({
      assessment,
      user,
      countryIso: 'FIN',
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      cycle: assessment.cycles.find((c) => c.name === '2020'),
      value: { raw: '12345.67654326543' },
    })

    expect(user.email.toLowerCase()).toBe('cosimo.togna@fao.org')
  })
})
