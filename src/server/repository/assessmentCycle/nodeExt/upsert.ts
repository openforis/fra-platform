import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeExt } from 'meta/nodeExt'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: string
  nodeExt: NodeExt<unknown>
}

export const upsert = <T extends NodeExt<unknown>>(props: Props, client: BaseProtocol = DB): Promise<T> => {
  const { assessment, countryIso, cycle, nodeExt } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const { parentUuid, props: nodeProps, type, uuid, value } = nodeExt

  return client.one<T>(
    `
         insert into ${schemaCycle}.node_ext 
           (country_iso, parent_uuid, props, type, uuid, value)
         values ($1, $2, $3::jsonb, $4, $5, $6::jsonb)
             on conflict (uuid) do update
              set (props, value) = ($3::jsonb, $6::jsonb)
         returning *
     `,
    [
      countryIso,
      parentUuid,
      nodeProps ? JSON.stringify(nodeProps) : null,
      type,
      uuid,
      value ? JSON.stringify(value) : null,
    ],
    Objects.camelize
  )
}
