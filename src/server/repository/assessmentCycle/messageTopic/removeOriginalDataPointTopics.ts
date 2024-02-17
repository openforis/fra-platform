import { Assessment, Cycle } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  odpId: number
}
export const removeOriginalDataPointTopics = (props: Props, client: BaseProtocol): Promise<number> => {
  const { assessment, cycle, odpId } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<number>(`
      delete
      from ${schemaCycle}.message_topic mt
      where mt.id in
            (select t.id
             from ${schemaCycle}.message_topic t
             where t.key like '${Topics.getOdpReviewTopicKeyPrefix(odpId)}%')
  `)
}
