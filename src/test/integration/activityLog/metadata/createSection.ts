import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Section } from 'meta/assessment/section'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { sectionParams } from 'test/integration/mock/section'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create section to write activity log', async () => {
    const { assessment, cycle, user } = testContext.activityLog

    const section = await MetadataController.createSection({ assessment, section: sectionParams(cycle.uuid), user })

    await ActivityLogAssertions.expectLastActivityLog<Section>({
      assessment,
      message: ActivityLogMessage.sectionCreate,
      section: 'section',
      target: section,
      user,
    })

    testContext.activityLogSection = section
  })
}
