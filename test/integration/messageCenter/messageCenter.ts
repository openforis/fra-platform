import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'
import { assessmentParams, assessmentCycleName } from '@test/integration/mock/assessment'
import { userMockTest } from '@test/integration/mock/user'
import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { MessageCenterController } from '@server/controller/messageCenter'

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
        countryIso: 'AFG' as CountryIso,
        assessment,
        cycle: assessmentCycle,
        key: 'TEST',
      })

      await MessageCenterController.addMessage({
        message: 'This is another test!',
        user,
        countryIso: 'AFG' as CountryIso,
        assessment,
        cycle: assessmentCycle,
        key: 'TEST',
      })

      const topic = await MessageCenterController.getTopic({
        countryIso: 'AFG' as CountryIso,
        assessmentName: assessment.props.name,
        cycleName: assessmentCycle.name,
        key: 'TEST',
      })

      expect(createdMessage.message).toEqual('This is a test!')
      expect(topic.key).toEqual('TEST')
      expect(topic.messages).toHaveLength(2)
      expect(topic.messages[0].message).toEqual('This is a test!')
      expect(topic.messages[1].message).toEqual('This is another test!')
    })
  })
