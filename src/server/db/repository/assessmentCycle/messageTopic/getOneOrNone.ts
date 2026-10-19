import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type PropsKey = { key: string }
type PropsId = { id: number }

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  includeMessages: boolean
} & (PropsId | PropsKey)

export const getOneOrNone = async (props: Props, client: BaseProtocol = DB): Promise<MessageTopic | undefined> => {
  const { assessment, countryIso, cycle, includeMessages } = props

  const { key } = props as PropsKey
  const { id } = props as PropsId

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      select t.* ${
        includeMessages
          ? `, jsonb_agg(
                   to_jsonb(m.*) ||
                   jsonb_build_object('user', to_jsonb(u.*))
                   order by m.created_time) as messages`
          : ''
      }
      from ${schemaCycle}.message_topic t
          ${
            includeMessages
              ? `left join ${schemaCycle}.message m on t.uuid = m.topic_uuid
                  left join public.users u on m.user_id = u.id`
              : ''
          }
      where country_iso = $1
        and ${key ? `key = $2` : `id = $2`}${
          includeMessages
            ? `
        group by t.id, country_iso, t.key, t.status, t.type`
            : ''
        }
  `

  return client.oneOrNone<MessageTopic>(query, [countryIso, key ?? id], Objects.camelize)
}
