import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  nodeExt: NodeExt
}

export const update = <T extends NodeExt = NodeExt<unknown, unknown>>(
  props: Props,
  client: BaseProtocol = DB
): Promise<T> => {
  const { assessment, cycle, nodeExt } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const { uuid, props: _props, value } = nodeExt

  return client.one<T>(
    `
        update ${schemaCycle}.node_ext
        set props = $2::jsonb, value = $3::jsonb
        where uuid = $1
        returning *
    `,
    [uuid, JSON.stringify(_props), JSON.stringify(value)],
    Objects.camelize
  )
}
