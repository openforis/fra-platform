import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Message } from 'meta/messageCenter/message'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  id: number
}

export const markDeleted = async (props: Props, client: BaseProtocol = DB): Promise<Message> => {
  const { assessment, cycle, id } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.one<Message>(
    `
        update ${schemaCycle}.message
        set deleted = true
        where id = $1
        returning *
    `,
    [id],
    Objects.camelize
  )
}
