import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const update = async (
  props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<{ lastOpenTime: string }> => {
  const { assessment, cycle, topic, user } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const cycleSchema = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.one<{ lastOpenTime: string }>(
    `
      update ${cycleSchema}.message_topic_user
      set last_open_time = now()
      where topic_uuid = $1 and user_id = $2
      returning last_open_time;
    `,
    [topic.uuid, user.id],
    Objects.camelize
  )
}
