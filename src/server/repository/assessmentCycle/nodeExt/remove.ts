import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  uuid: string
}

export const remove = (props: Props, client: BaseProtocol = DB): Promise<NodeExt<unknown>> => {
  const { assessment, cycle, uuid } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<NodeExt<unknown>>(
    `
         delete from ${schemaCycle}.node_ext
         where uuid = $1
         returning *
     `,
    [uuid],
    Objects.camelize
  )
}
