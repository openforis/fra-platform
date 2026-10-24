import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionKey } from 'meta/assessment/descriptionValue'
import { Link } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'
import { SectionNames } from 'meta/routes/sectionNames'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { LinksService } from 'server/service/links'

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
    const descriptionKeys = descriptionLocations.map<CommentableDescriptionKey>(({ descriptionName, sectionName }) => ({
      name: descriptionName,
      sectionName,
    }))
    await LinksService.enqueueDescriptionLinksValidation({ assessment, countryIso, cycle, descriptionKeys })
  }

  // If the link has national data point locations, we trigger the flow that updates the ndp validation cache.
  const nationalDataPointLocations = updatedLink.locations.filter(Links.isNationalDataPointLocation)
  if (!Objects.isEmpty(nationalDataPointLocations)) {
    const { countryIso } = updatedLink
    const targets = nationalDataPointLocations.map<NDPLinkTarget>(({ ndpSection, ndpUuid }) => ({
      ndpUuid,
      fields: [ndpSection],
    }))
    await LinksService.enqueueNationalDataPointLinksValidation({ assessment, countryIso, cycle, targets })
  }

  return updatedLink
}
