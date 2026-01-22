import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/routes/sectionNames'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

type Returned = { lastCompletedAt: string | null }

export const getLastLinksCheckCompleteTime = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Returned | null> => {
  const { assessment, countryIso, cycle } = props

  const whereConditions = [
    `assessment_uuid = $(assessmentUuid)`,
    `cycle_uuid = $(cycleUuid)`,
    `message = $(message)`,
    `section = $(section)`,
    countryIso && `country_iso = $(countryIso)`,
  ].filter(Boolean)

  return client.oneOrNone<Returned | null>(
    `
      select max(time) as last_completed_at
      from public.activity_log
      where ${whereConditions.join(' and ')}
    `,
    {
      assessmentUuid: assessment.uuid,
      countryIso,
      cycleUuid: cycle.uuid,
      message: ActivityLogMessage.linksCheckComplete,
      section: SectionNames.Admin.links,
    },
    Objects.camelize
  )
}
