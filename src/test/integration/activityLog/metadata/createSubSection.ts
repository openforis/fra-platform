import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SubSection } from 'meta/assessment/section'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { subSectionParams } from 'test/integration/mock/section'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create sub section to write activity log', async () => {
    const { assessment, cycle, user } = testContext.activityLog
    const { activityLogSection } = testContext

    const subSection = await MetadataController.createSubSection({
      assessment,
      parentSectionUuid: activityLogSection.uuid,
      section: subSectionParams(cycle.uuid),
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog<SubSection>({
      assessment,
      message: ActivityLogMessage.sectionCreate,
      section: 'section',
      target: { ...subSection, parentUuid: activityLogSection.uuid },
      user,
    })

    testContext.activityLogSubSection = subSection
  })
}
