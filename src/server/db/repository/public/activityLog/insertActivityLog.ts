import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { AssessmentBase } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props<Message extends ActivityLogMessage> = {
  activityLog: ActivityLog<ActivityLogTarget<Message>, Message>
  assessment?: AssessmentBase
  cycle?: Cycle
}

export const insertActivityLog = async <Message extends ActivityLogMessage>(
  params: Props<Message>,
  client: BaseProtocol = DB
): Promise<ActivityLog<ActivityLogTarget<Message>>> => {
  const {
    activityLog: { countryIso, message, section, target, user },
    assessment,
    cycle,
  } = params

  const query = `
    insert into public.activity_log(user_id, country_iso, section, message, target, assessment_uuid, cycle_uuid) values ($1, $2, $3, $4, $5::JSONB, $6, $7) returning *;
  `

  return client.one<ActivityLog<ActivityLogTarget<Message>>>(
    query,
    [
      user.id,
      countryIso,
      section,
      message,
      JSON.stringify(target),
      assessment ? assessment.uuid : null,
      cycle ? cycle.uuid : null,
    ],
    Objects.camelize
  )
}
