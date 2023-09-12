import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, Section } from 'meta/assessment'
import { MessageTopic, MessageTopicType } from 'meta/messageCenter'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const create = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    type: MessageTopicType
    section?: Section
  },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { countryIso, assessment, cycle, key, type, section } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<MessageTopic>(
    `
      insert into ${schemaCycle}.message_topic (country_iso, key, type${section ? ', section_uuid' : ''})
      values ($1, $2, $3 ${section ? `, '${section.uuid}'` : ''})
      returning *;
  `,
    [countryIso, key, type],
    Objects.camelize
  )
}
