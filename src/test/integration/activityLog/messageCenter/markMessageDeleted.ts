import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { MessageCenterController } from 'server/controller/messageCenter'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { messageCenterSectionName } from 'test/integration/activityLog/messageCenter/addMessage'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect mark message deleted to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { activityLogMessage } = testContext

    await MessageCenterController.markMessageDeleted({
      assessment,
      countryIso: country.countryIso,
      cycle,
      id: activityLogMessage.id,
      sectionName: messageCenterSectionName,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.messageMarkDeleted,
      section: messageCenterSectionName,
      target: { id: activityLogMessage.id, topicUuid: activityLogMessage.topicUuid },
    })
  })
}
