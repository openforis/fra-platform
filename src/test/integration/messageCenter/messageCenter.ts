import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user/user'

import { AssessmentController } from 'server/controller/assessment'
import { MessageCenterController } from 'server/controller/messageCenter'
import { UserController } from 'server/controller/user'

import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest } from 'test/integration/mock/user'

export default (): void =>
  describe('Message topic tests', () => {
    let assessment: Assessment
    let cycle: Cycle
    let user: User

    beforeAll(async () => {
      ;({ assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      }))

      user = await UserController.getOne({ email: userMockTest.email })
    })

    it('Create new Message topic adding a Message', async () => {
      const { message: createdMessage } = await MessageCenterController.addMessage({
        message: 'This is a test!',
        user,
        countryIso: 'X02' as CountryIso,
        assessment,
        cycle,
        key: 'TEST',
        type: MessageTopicType.review,
        sectionName: 'childSection',
      })

      await MessageCenterController.addMessage({
        message: 'This is another test!',
        user,
        countryIso: 'X02' as CountryIso,
        assessment,
        cycle,
        key: 'TEST',
        type: MessageTopicType.review,
        sectionName: 'childSection',
      })

      const topic = await MessageCenterController.getTopic({
        countryIso: 'X02' as CountryIso,
        assessment,
        cycle,
        key: 'TEST',
        user,
      })

      expect(createdMessage.message).toEqual('This is a test!')
      expect(topic.key).toEqual('TEST')
      expect(topic.messages).toHaveLength(2)
      expect(topic.messages[0].message).toEqual('This is a test!')
      expect(topic.messages[1].message).toEqual('This is another test!')
      expect(topic.type).toBe(MessageTopicType.review)
    })
  })
