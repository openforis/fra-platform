import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { DescriptionController } from 'server/controller/cycleData/description'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { descriptionParams } from 'test/integration/mock/description'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect upsert description to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { name, sectionName, value } = descriptionParams

    await DescriptionController.upsertDescription({ assessment, country, cycle, name, sectionName, user, value })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.descriptionUpdate,
      section: sectionName,
      target: { description: { value }, name },
    })
  })
}
