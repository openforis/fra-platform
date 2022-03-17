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
      })

      const topic = await MessageCenterController.getTopic({
        countryIso: 'AFG' as CountryIso,
        assessmentName: assessment.props.name,
        cycleName: assessmentCycle.name,
      })

      expect(createdMessage).toHaveProperty('id')
      expect(topic).toHaveProperty('id')
      expect(topic.messages).toHaveLength(2)
    })
  })
