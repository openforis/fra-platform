import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ActivityLog, ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

const acceptedMessages = [
  ActivityLogMessage.invitationAccept,
  ActivityLogMessage.invitationAdd,
  ActivityLogMessage.invitationRemove,
  ActivityLogMessage.descriptionUpdate,
  ActivityLogMessage.nodeValueUpdate,
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.originalDataPointUpdateDataSources,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
  ActivityLogMessage.assessmentStatusUpdate,
  ActivityLogMessage.messageCreate,
  ActivityLogMessage.topicStatusChange,
]

export const getCycleDataActivities = (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<ActivityLog<any>>> => {
  const { countryIso, assessment, cycle } = props

  return client.map<ActivityLog<any>>(
    `
      select
        a.*,
        to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename' as user  
      from (
        select
          user_id, message, section, target, time,
          rank() OVER (PARTITION BY user_id, message, section ORDER BY time DESC) as rank
        from public.activity_log a
        where a.country_iso = $1
          and a.assessment_uuid = $2
          and a.cycle_uuid = $3
          and a.message in ($4:list)
          and a.section not in ($5:list)
      ) as a
      join public.users u on user_id = u.id
      where rank = 1
      order by time desc
      limit 20
    `,
    [countryIso, assessment.uuid, cycle.uuid, acceptedMessages, ['chat']],

    (row) => Objects.camelize(row)
  )
}
