import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update table section to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogTableSection } = testContext
    const props = { ...activityLogTableSection.props, labels: { label1: { key: 'updatedLabel' } } }

    const updatedTableSection = await MetadataController.updateTableSection({
      assessment,
      tableSection: { ...activityLogTableSection, props },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.tableSectionUpdate,
      section: 'tableSection',
      target: { ...updatedTableSection, props },
      user,
    })

    testContext.activityLogTableSection = updatedTableSection
  })
}
