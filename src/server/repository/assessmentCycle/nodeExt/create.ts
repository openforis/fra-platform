import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'
import { NodeExtType } from 'meta/nodeExt/nodeExt'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: string
  type: NodeExtType
  props: any
}

export const create = (props: Props, client: BaseProtocol = DB): Promise<NodeExt> => {
  const { assessment, cycle, countryIso, type, props: _props } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<NodeExt>(
    `
        insert into ${schemaCycle}.node_ext (country_iso, type, props)
        values ($1, $2, $3::jsonb)
        returning *
    `,
    [countryIso, type, JSON.stringify(_props)],
    Objects.camelize
  )
}
