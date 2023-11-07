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
  props: unknown
  value: unknown
}

export const create = <T extends NodeExt = NodeExt<unknown, unknown>>(
  props: Props,
  client: BaseProtocol = DB
): Promise<T> => {
  const { assessment, cycle, countryIso, type, props: _props, value } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<T>(
    `
        insert into ${schemaCycle}.node_ext (country_iso, type, props, value)
        values ($1, $2, $3::jsonb, $4::jsonb)
        returning *
    `,
    [countryIso, type, JSON.stringify(_props), JSON.stringify(value)],
    Objects.camelize
  )
}
