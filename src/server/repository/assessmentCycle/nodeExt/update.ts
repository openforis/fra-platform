import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  nodeExt: NodeExt
}

export const update = (props: Props, client: BaseProtocol = DB): Promise<NodeExt> => {
  const { assessment, cycle, nodeExt } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<NodeExt>(
    `
        update ${schemaCycle}.node_ext
        set props = $2::jsonb
        where uuid = $1
        returning *
    `,
    [nodeExt.uuid, JSON.stringify(nodeExt.props)],
    Objects.camelize
  )
}
