import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  keyPrefix: string
}

export const removeMany = (props: Props, client: BaseProtocol): Promise<number> => {
  const { assessment, cycle, keyPrefix } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<number>(`
      delete
      from ${schemaCycle}.message_topic mt
      where mt.id in
            (select t.id
             from ${schemaCycle}.message_topic t
             where t.key like '${keyPrefix}%')
  `)
}
