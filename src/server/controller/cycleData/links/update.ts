import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionIdentifier } from 'meta/assessment/descriptionValue'
import { Link } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { SectionNames } from 'meta/routes/sectionNames'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { visitDescriptionLinks } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/visitDescriptionLinks'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  link: Link
  user: User
}

export const update = async (props: Props): Promise<Link> => {
  const { assessment, cycle, user } = props

  const updatedLink = await DB.tx(async (t: BaseProtocol) => {
    const updatedLink = await LinkRepository.update(props, t)
    const { id, link, props: _props, uuid } = updatedLink
    const target = { id, link, props: _props, uuid }

    const message = ActivityLogMessage.linkUpdate
    const section = SectionNames.Admin.links
    const activityLog = { target, section, message, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return updatedLink
  })

  // If the link has description locations, we trigger the flow that updates validation cache.
  const descriptionLocations = updatedLink.locations.filter(Links.isDescriptionLocation)
  if (!Objects.isEmpty(descriptionLocations)) {
    const { countryIso } = updatedLink
    const descriptionIdentifiers = descriptionLocations.map<DescriptionIdentifier>(
      ({ descriptionName, sectionName }) => ({
        name: descriptionName,
        sectionName,
      })
    )
    await visitDescriptionLinks({ assessment, countryIso, cycle, descriptionIdentifiers })
  }

  return updatedLink
}
