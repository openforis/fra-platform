import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic, MessageTopicStatus } from 'meta/messageCenter'

import { BaseProtocol, DB } from 'server/db/db'
import { getOneOrNone } from 'server/db/repository/assessmentCycle/messageTopic/getOneOrNone'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  key: string
  status: MessageTopicStatus
  includeMessages: boolean
}

export const updateStatus = async (props: Props, client: BaseProtocol = DB): Promise<MessageTopic> => {
  const { assessment, countryIso, cycle, includeMessages, key, status } = props

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
