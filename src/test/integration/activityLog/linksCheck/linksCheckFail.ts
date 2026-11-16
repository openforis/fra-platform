import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/routes/sectionNames'

import { insertLinksCheckActivityLog } from 'server/worker/tasks/verifyLinks/utils/insertLinksCheckActivityLog'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect links check failed to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const error = new Error('Links check failed')

    await insertLinksCheckActivityLog({ assessment, countryIso, cycle, error, status: 'failed', user })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.linksCheckFail,
      section: SectionNames.Admin.links,
      target: { error: 'Error: Links check failed', jobStatus: 'failed' },
    })
  })
}
