import { Assessment, Cycle } from '@meta/assessment'
// import { User } from '@meta/user'
import { assessmentParams, assessmentCycleName } from '@test/integration/mock/assessment'
// import { userMockTest } from '@test/integration/mock/user'
import { AssessmentController } from '@server/controller/assessment'
// import { UserController } from '@server/controller/user'
import { MessageCenterController } from '@server/controller/messageCenter'
import { CountryIso } from '@meta/area'
import { MessageTopicStatus } from '@meta/topic/topic'

export default (): void =>
  describe('Message topic tests', () => {
    let assessment: Assessment
    let assessmentCycle: Cycle
    // let user: User

    beforeAll(async () => {
      ;({ assessment, cycle: assessmentCycle } = await AssessmentController.getOneWithCycle({
        name: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      }))

      // user = await UserController.read({ user: { email: userMockTest.email } })
    })

    it('Create new Message topic', async () => {
      const createdMessageTopic = await MessageCenterController.create({
        countryIso: 'AFG' as CountryIso,
        assessment,
        cycle: assessmentCycle,
        key: '',
        status: MessageTopicStatus.opened,
      })

      expect(createdMessageTopic).toHaveProperty('id')
    })
  })
