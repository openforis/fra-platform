import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  keyPrefix: string
}

export const removeMany = (props: Props, client: BaseProtocol): Promise<number> => {
  const { assessment, cycle, keyPrefix } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.oneOrNone<number>(`
      delete
      from ${schemaCycle}.message_topic mt
      where mt.id in
            (select t.id
             from ${schemaCycle}.message_topic t
             where t.key like '${keyPrefix}%')
  `)
}
