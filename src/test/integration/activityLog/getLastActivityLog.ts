import { AreaCode } from 'meta/area/areaCode'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { DB } from 'server/db/db'

type ActivityLogRow<Target> = {
  assessmentUuid: UUID
  countryIso: AreaCode
  cycleUuid: UUID
  message: ActivityLogMessage
  section: string
  target: Target
  userId: number
}

type Props = {
  assessment: Assessment
  countryIso?: AreaCode
  cycle?: Cycle
  message: ActivityLogMessage
}

export const getLastActivityLog = async <Target>(props: Props): Promise<ActivityLogRow<Target>> => {
  const { assessment, countryIso, cycle, message } = props

  return DB.one<ActivityLogRow<Target>>(
    `
      select al.*
      from public.activity_log al
      where al.assessment_uuid = $(assessmentUuid)
        and al.cycle_uuid is not distinct from $(cycleUuid)
        and al.country_iso is not distinct from $(countryIso)
        and al.message = $(message)
      order by al.id desc
      limit 1
    `,
    { assessmentUuid: assessment.uuid, countryIso: countryIso ?? null, cycleUuid: cycle?.uuid ?? null, message },
    (row) => Objects.camelize(row, { skip: ['target'] })
  )
}
