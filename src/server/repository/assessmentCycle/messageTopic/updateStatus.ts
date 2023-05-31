import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic, MessageTopicStatus } from 'meta/messageCenter'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOneOrNone } from './getOneOrNone'

export const updateStatus = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    status: MessageTopicStatus
    includeMessages: boolean
  },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { countryIso, assessment, cycle, key, status, includeMessages } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.one<MessageTopic>(
    `
        update ${schemaCycle}.message_topic set
        status = $1
        where country_iso = $2 and key = $3
        returning *
    `,
    [status, countryIso, key]
  )

  return getOneOrNone({ countryIso, assessment, cycle, key, includeMessages }, client)
}
