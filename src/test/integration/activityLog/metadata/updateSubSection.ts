import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update sub section to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogSubSection } = testContext
    const props = { ...activityLogSubSection.props, showTitle: !activityLogSubSection.props.showTitle }

    const updatedSubSection = await MetadataController.updateSubSection({
      assessment,
      section: { ...activityLogSubSection, props },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.sectionUpdate,
      section: 'section',
      target: { ...updatedSubSection, props },
      user,
    })

    testContext.activityLogSubSection = updatedSubSection
  })
}
