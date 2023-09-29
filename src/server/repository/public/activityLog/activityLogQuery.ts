import * as pgPromise from 'pg-promise'

import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'

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
  ActivityLogMessage.originalDataPointUpdateDescription,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.assessmentStatusUpdate,
  ActivityLogMessage.messageCreate,
  ActivityLogMessage.topicStatusChange,
]

const hiddenSections = ['chat']

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle

  select?: string

  limit?: string
  offset?: string
}

export const activityLogQuery = (props: Props) => {
  const { select: _select, countryIso, assessment, cycle, limit, offset } = props
  const pgp = pgPromise()

  // default select
  const select = `a.*, to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename' as user`

  // when returning paginated result, return the activity log sorted by time
  const _limit = `
  order by time desc
  limit $6 offset $7
  `

  return pgp.as.format(
    `
      select
       ${_select || select}
      from (
        select
          country_iso, user_id, message, section, target, time,
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
        ${limit && offset ? _limit : ''}
  `,
    [countryIso, assessment.uuid, cycle.uuid, acceptedMessages, hiddenSections, limit, offset]
  )
}
