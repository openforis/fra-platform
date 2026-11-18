import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/routes/sectionNames'

import { insertLinksCheckActivityLog } from 'server/worker/tasks/verifyLinks/utils/insertLinksCheckActivityLog'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect links check started to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country

    await insertLinksCheckActivityLog({ assessment, countryIso, cycle, status: 'started', user })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.linksCheckStart,
      section: SectionNames.Admin.links,
      target: { jobStatus: 'started' },
    })
  })
}
