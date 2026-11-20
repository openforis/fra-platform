import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { MessageCenterController } from 'server/controller/messageCenter'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export const messageCenterSectionName = 'messageBoard'

export default (): void => {
  test('Expect add message to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog

    const { message, topic } = await MessageCenterController.addMessage({
      assessment,
      countryIso: country.countryIso,
      cycle,
      key: Topics.getMessageBoardCountryKey(),
      message: 'Test message',
      sectionName: messageCenterSectionName,
      type: MessageTopicType.messageBoard,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.messageCreate,
      section: messageCenterSectionName,
      target: { id: message.id, topicUuid: topic.uuid },
    })

    testContext.activityLogMessage = message
  })
}
