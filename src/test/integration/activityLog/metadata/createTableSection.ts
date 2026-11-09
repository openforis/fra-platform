import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { TableSection } from 'meta/assessment/tableSection'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { tableSectionParams } from 'test/integration/mock/tableSection'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create table section to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogSubSection } = testContext

    const tableSection = await MetadataController.createTableSection({
      assessment,
      tableSection: { ...tableSectionParams, sectionUuid: activityLogSubSection.uuid },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog<TableSection>({
      assessment,
      message: ActivityLogMessage.tableSectionCreate,
      section: 'tableSection',
      target: { ...tableSection, sectionUuid: activityLogSubSection.uuid },
      user,
    })

    testContext.activityLogTableSection = tableSection
  })
}
