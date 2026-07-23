import { CycleStatus } from 'meta/assessment/cycle'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'

export default (): void =>
  test('Expect assessment to be created', async () => {
    const user = await UserController.getOne({ email: userMockTest.email })
    const assessment = await AssessmentController.create({ assessment: assessmentParams, user })

    const { assessment: assessmentCycle, cycle } = await AssessmentController.createCycle({
      assessment,
      options: { name: assessmentCycleName },
      user,
    })
    // Init countries: TODO: if needed move it to the repository
    const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName: assessmentCycleName, cycleName: cycle.name })
    await DB.query(`
      insert into ${schemaCycle}.country (country_iso)
      select country_iso
      from country
  `)

    cycle.props.status = CycleStatus.published
    await AssessmentController.updateCycle({ cycle })

    await CacheController.generateMetaCache({ assessments: [assessmentCycle] })

    expect(assessment).toHaveProperty('id')
    expect(assessment.id).toBeTruthy()
    expect(assessment).toHaveProperty('uuid')
    expect(assessment.uuid).toBeTruthy()

    expect(assessment).toHaveProperty('props')

    expect(assessment).toHaveProperty('props.name')
    expect(assessment.props.name).toBe(assessmentParams.props.name)

    expect(assessmentCycle).toHaveProperty('id')
  })
