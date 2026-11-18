import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { LinkToVisit } from 'meta/cycleData/links/link'
import { SectionNames } from 'meta/routes/sectionNames'

import { LinksController } from 'server/controller/cycleData/links'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update link to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    // links are created by the links check worker
    const linksToVisit: Array<LinkToVisit> = [{ countryIso, link: 'https://www.fao.org', locations: [], name: 'FAO' }]
    const [link] = await LinkRepository.upsertLinks({ assessment, cycle, linksToVisit, linkVisits: [] })

    const { id, props, uuid } = await LinksController.update({
      assessment,
      countryIso,
      cycle,
      link: { ...link, props: { ...link.props, approved: true } },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.linkUpdate,
      section: SectionNames.Admin.links,
      target: { id, link: link.link, props, uuid },
      user,
    })
  })
}
