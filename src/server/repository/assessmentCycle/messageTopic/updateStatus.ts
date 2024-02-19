import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic, MessageTopicStatus } from 'meta/messageCenter'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOneOrNone } from './getOneOrNone'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  key: string
  status: MessageTopicStatus
  includeMessages: boolean
}

export const updateStatus = async (props: Props, client: BaseProtocol = DB): Promise<MessageTopic> => {
  const { assessment, cycle, countryIso, key, status, includeMessages } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(
    `
        update ${schemaCycle}.message_topic set
        status = $1
        where country_iso = $2 and key = $3
    `,
    [status, countryIso, key]
  )

  return getOneOrNone({ countryIso, assessment, cycle, key, includeMessages }, client)
}
