import { CycleStatus } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { UserController } from 'server/controller/user'

import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'

export default (): void =>
  test('Expect assessment to be created', async () => {
    const user = await UserController.getOne({ email: userMockTest.email })
    const assessment = await AssessmentController.create({ assessment: assessmentParams, user })

    const { assessment: assessmentCycle, cycle } = await AssessmentController.createCycle({
      assessment,
      name: assessmentCycleName,
      user,
      withCountries: true,
    })

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
