import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic, MessageTopicType } from '@meta/messageCenter'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const create = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; key: string; type: MessageTopicType },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { countryIso, assessment, cycle, key, type } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<MessageTopic>(
    `
        insert into ${schemaCycle}.message_topic (country_iso, key, type)
        values ($1, $2, $3)
        returning *;
    `,
    [countryIso, key, type],
    Objects.camelize
  )
}
