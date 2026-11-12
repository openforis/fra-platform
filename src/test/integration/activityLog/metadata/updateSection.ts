import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update section to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogSection } = testContext
    const props = { ...activityLogSection.props, index: activityLogSection.props.index + 1 }

    const updatedSection = await MetadataController.updateSection({
      assessment,
      section: { ...activityLogSection, props },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.sectionUpdate,
      section: 'section',
      target: { ...updatedSection, props },
      user,
    })

    testContext.activityLogSection = updatedSection
  })
}
