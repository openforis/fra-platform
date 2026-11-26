import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/routes/sectionNames'

import { RepositoryController } from 'server/controller/cycleData/repository'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { activityLogRepositoryItem } = testContext
    const repositoryItem = { ...activityLogRepositoryItem, description: 'Updated description' }

    const updatedItem = await RepositoryController.update({
      assessment,
      countryIso: country.countryIso,
      cycle,
      repositoryItem,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.repositoryItemUpdate,
      section: SectionNames.Country.Home.repository,
      target: { ...updatedItem, description: repositoryItem.description },
    })

    testContext.activityLogRepositoryItem = updatedItem
  })
}
