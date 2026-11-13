import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/routes/sectionNames'

import { RepositoryController } from 'server/controller/cycleData/repository'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { activityLogRepositoryItem } = testContext

    await RepositoryController.remove({
      assessment,
      countryIso: country.countryIso,
      cycle,
      user,
      uuid: activityLogRepositoryItem.uuid,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.repositoryItemDelete,
      section: SectionNames.Country.Home.repository,
      target: activityLogRepositoryItem,
    })
  })
}
