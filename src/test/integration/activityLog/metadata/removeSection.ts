import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Section } from 'meta/assessment/section'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove section to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogSection } = testContext

    await MetadataController.removeSection({ assessment, section: activityLogSection, user })

    await ActivityLogAssertions.expectLastActivityLog<Section>({
      assessment,
      message: ActivityLogMessage.sectionDelete,
      section: 'section',
      target: activityLogSection,
      user,
    })
  })
}
