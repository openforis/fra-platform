import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { ActivityLog, ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

const acceptedMessages = [
  ActivityLogMessage.invitationAccept,
  ActivityLogMessage.invitationAdd,
  ActivityLogMessage.invitationRemove,
  ActivityLogMessage.descriptionUpdate,
  ActivityLogMessage.nodeValueUpdate,
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.assessmentStatusUpdate,
  ActivityLogMessage.messageCreate,
  ActivityLogMessage.topicStatusChange,
]
  .map((s) => `'${s}'`)
  .join(', ')

export const getCycleDataActivities = (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<ActivityLog<any>>> => {
  const { countryIso, assessment, cycle } = props

  const schema = Schemas.getName(assessment)

  return client.map<ActivityLog<any>>(
    `
      select
        a.*,
        to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename' as user  
      from (
        select
          user_id, message, section, target, time,
          rank() OVER (PARTITION BY user_id, message, section ORDER BY time DESC) as rank
        from ${schema}.activity_log a
        where a.country_iso = $1
          and a.cycle_uuid = $2
          and a.message in (${acceptedMessages})
      ) as a
      join public.users u on user_id = u.id
      where rank = 1
      order by time desc
      limit 20
    `,
    [countryIso, cycle.uuid],

    (row) => Objects.camelize(row)
  )
}
