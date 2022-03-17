import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic, MessageTopicStatus } from '@meta/messageCenter'

export const create = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; key: string },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { countryIso, assessment, cycle, key } = props

  return client.one<MessageTopic>(
    `
        insert into public.message_topic (country_iso, assessment_id, cycle_id, key, status)
        values ($1, $2, $3, $4, $5)
        returning *;
    `,
    [countryIso, assessment.id, cycle.id, key, MessageTopicStatus.opened],
    Objects.camelize
  )
}
