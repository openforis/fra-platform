import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { Message } from 'meta/messageCenter'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  id: number
}

export const markDeleted = async (props: Props, client: BaseProtocol = DB): Promise<Message> => {
  const { assessment, cycle, id } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

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
