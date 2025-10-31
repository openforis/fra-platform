import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'
import { MessageTopic, MessageTopicType } from 'meta/messageCenter'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

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
  const { assessment, countryIso, cycle, key, section, type } = props

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
