import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { SectionNames } from 'meta/routes/sectionNames'

import { RepositoryController } from 'server/controller/cycleData/repository'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const repositoryItem = { countryIso, link: 'https://www.fao.org', props: {} } as RepositoryItem

    const createdItem = await RepositoryController.create({ assessment, countryIso, cycle, repositoryItem, user })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.repositoryItemCreate,
      section: SectionNames.Country.Home.repository,
      target: createdItem,
    })

    testContext.activityLogRepositoryItem = createdItem
  })
}
