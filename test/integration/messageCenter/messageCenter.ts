import { Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'
import { assessmentParams, assessmentCycleName } from '@test/integration/mock/assessment'
import { userMockTest } from '@test/integration/mock/user'
import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { MessageCenterController } from '@server/controller/messageCenter'
import { CountryIso } from '@meta/area'
import { MessageTopicStatus } from '@meta/messageCenter'

export default (): void =>
  describe('Message topic tests', () => {
    let assessment: Assessment
    let assessmentCycle: Cycle
    let user: User

    beforeAll(async () => {
      ;({ assessment, cycle: assessmentCycle } = await AssessmentController.getOneWithCycle({
        name: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      }))

      user = await UserController.read({ user: { email: userMockTest.email } })
    })

    it('Create new Message topic adding a Message', async () => {
      const createdMessage = await MessageCenterController.addMessage({
        message: 'This is a test!',
        user,
        topic: {
          countryIso: 'AFG' as CountryIso,
          assessment,
          cycle: assessmentCycle,
          key: 'TEST',
          status: MessageTopicStatus.opened,
        },
      })

      await MessageCenterController.addMessage({
        message: 'This is another test!',
        user,
        topicId: createdMessage.topicId,
      })

      const topic = await MessageCenterController.getTopic({ topicId: createdMessage.topicId })

      expect(createdMessage).toHaveProperty('id')
      expect(topic).toHaveProperty('id')
      expect(topic.messages).toHaveLength(2)
    })
  })
