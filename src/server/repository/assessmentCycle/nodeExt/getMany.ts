import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  type: string
}

export const getMany = <T extends NodeExt = NodeExt<unknown, unknown>>(
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<T>> => {
  const { assessment, cycle, countryIso, type } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<T>(
    `
       select * from ${schemaCycle}.node_ext
       where country_iso = $1 and type = $2
    `,
    [countryIso, type],
    (row) => Objects.camelize(row)
  )
}
