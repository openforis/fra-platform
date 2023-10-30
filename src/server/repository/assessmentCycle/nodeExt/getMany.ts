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

export const getMany = (props: Props, client: BaseProtocol = DB): Promise<Array<NodeExt>> => {
  const { assessment, cycle, countryIso, type } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<NodeExt>(
    `
       select * from ${schemaCycle}.node_ext
       where country_iso = $1 and type = $2
    `,
    [countryIso, type],
    (row) => Objects.camelize(row)
  )
}
