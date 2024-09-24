import { Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  cycle: Cycle
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { cycle } = props

  return client.none(
    `
    update public.assessment_cycle
    set props = $2
    where uuid = $1
    `,
    [cycle.uuid, cycle.props]
  )
}
