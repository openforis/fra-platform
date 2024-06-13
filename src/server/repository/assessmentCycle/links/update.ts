import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { Link } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  link: Link
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<Link> => {
  const { assessment, cycle, link } = props
  const { uuid, props: _props } = link

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<Link>(
    `
      update ${schemaCycle}.link
      set props = $1
      where uuid = $2
      returning *
    `,
    [_props, uuid],
    (row) => Objects.camelize(row)
  )
}
