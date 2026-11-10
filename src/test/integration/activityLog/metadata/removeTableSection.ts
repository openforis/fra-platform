import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove table section to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogTableSection } = testContext

    await MetadataController.removeTableSection({ assessment, tableSection: activityLogTableSection, user })

    // NB: The target is wrapped: { deletedTableSection }
    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.tableSectionDelete,
      section: 'tableSection',
      target: { deletedTableSection: activityLogTableSection },
      user,
    })
  })
}
