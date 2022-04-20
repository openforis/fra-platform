import { CountryIso } from '@core/country'
import { Objects } from '@core/utils'
import { BaseProtocol, DB, Schemas } from '@server/db'

import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'

export const getOneOrNone = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; key: string; includeMessages: boolean },
  client: BaseProtocol = DB
): Promise<MessageTopic | undefined> => {
  const { countryIso, assessment, cycle, key, includeMessages } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      select t.* ${
        includeMessages
          ? `,
      jsonb_agg(to_jsonb(m.*)) as messages`
          : ''
      }
      from ${schemaCycle}.message_topic t
          ${
            includeMessages
              ? `left join (
        select msg.*,
        to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename' as user
        from ${schemaCycle}.message msg
        left join public.users u 
          on msg.user_id = u.id
        group by msg.id, u.*
      ) m on m.topic_id = t.id`
              : ''
          }
      where country_iso = $1
        and key = $2 ${includeMessages ? `group by t.id` : ''}
  `

  return client.oneOrNone<MessageTopic>(query, [countryIso, key], Objects.camelize)
}
