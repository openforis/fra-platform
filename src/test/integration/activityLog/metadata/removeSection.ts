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

    // NB: The target is wrapped: { deletedSection }
    await ActivityLogAssertions.expectLastActivityLog<{ deletedSection: Section }>({
      assessment,
      message: ActivityLogMessage.sectionDelete,
      section: 'section',
      target: { deletedSection: activityLogSection },
      user,
    })
  })
}
