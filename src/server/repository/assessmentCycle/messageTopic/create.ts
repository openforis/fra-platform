import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic, MessageTopicType } from '@meta/messageCenter'

import { BaseProtocol, DB, Schemas } from '@server/db'
import { SectionRepository } from '@server/repository/assessment/section'

export const create = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    type: MessageTopicType
    sectionName?: string
  },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { countryIso, assessment, cycle, key, type, sectionName } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // Country Message board section_uuid = null
  let section
  if (sectionName)
    section = await SectionRepository.getOne({
      assessment,
      cycle,
      sectionName,
    })

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
