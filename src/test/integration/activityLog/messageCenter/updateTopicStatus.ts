import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { MessageTopicStatus } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { MessageCenterController } from 'server/controller/messageCenter'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { messageCenterSectionName } from 'test/integration/activityLog/messageCenter/addMessage'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update topic status to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog

    const topic = await MessageCenterController.updateTopicStatus({
      assessment,
      countryIso: country.countryIso,
      cycle,
      key: Topics.getMessageBoardCountryKey(),
      sectionName: messageCenterSectionName,
      status: MessageTopicStatus.resolved,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.topicStatusChange,
      section: messageCenterSectionName,
      target: { ...topic, status: MessageTopicStatus.resolved },
    })
  })
}
