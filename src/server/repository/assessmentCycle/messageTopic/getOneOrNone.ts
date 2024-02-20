import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic } from 'meta/messageCenter'

import { BaseProtocol, DB, Schemas } from 'server/db'

type PropsKey = { key: string }
type PropsId = { id: number }

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  includeMessages: boolean
} & (PropsId | PropsKey)

export const getOneOrNone = async (props: Props, client: BaseProtocol = DB): Promise<MessageTopic | undefined> => {
  const { countryIso, assessment, cycle, includeMessages } = props

  const { key } = props as PropsKey
  const { id } = props as PropsId

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      select t.* ${
        includeMessages
          ? `, jsonb_agg(
                   to_jsonb(m.*) ||
                   jsonb_build_object('user', to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename')
                   order by m.created_time) as messages`
          : ''
      }
      from ${schemaCycle}.message_topic t
          ${
            includeMessages
              ? `left join ${schemaCycle}.message m on t.id = m.topic_id
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
