import { Objects } from 'utils/objects'

import { Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  cycle: Cycle
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<Cycle> => {
  const { cycle } = props

  return client.one<Cycle>(
    `
              delete
              from assessment_cycle
              where id = $1
              returning *;`,
    [cycle.id],
    Objects.camelize
  )
}
