import { BaseProtocol, DB } from '@server/db'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'
import { Objects } from '@core/utils'
import { CountryIso } from '@core/country'

export const getOneOrNone = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; key: string; includeMessages: boolean },
  client: BaseProtocol = DB
): Promise<MessageTopic | undefined> => {
  const { countryIso, assessment, cycle, key, includeMessages } = props

  const query = `
      select *
      from public.message_topic
      where country_iso = $1 and assessment_id = $2 and cycle_id = $3 and key = $4
    `

  const queryWithMessages = `
      select t.*,
      jsonb_agg(to_jsonb(m.*)) as messages
      from public.message_topic t
      left join (
        select msg.*,
        to_jsonb(u.*) as user
        from public.message msg
        left join public.users u on msg.user_id = u.id
        group by msg.id, u.*
      ) m on m.topic_id = t.id
      where country_iso = $1 and assessment_id = $2 and cycle_id = $3 and key = $4
      group by t.id
    `

  return client.oneOrNone<MessageTopic | undefined>(
    includeMessages ? queryWithMessages : query,
    [countryIso, assessment.id, cycle.id, key],
    Objects.camelize
  )
}
