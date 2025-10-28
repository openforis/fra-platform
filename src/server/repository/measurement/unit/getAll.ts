import { Unit } from 'meta/measurement/unit'

import { BaseProtocol, DB } from 'server/db/db'

export const getAll = (client: BaseProtocol = DB): Promise<Array<Unit>> => {
  return client.any<Unit>(
    `
      select
        u.uuid,
        u.name,
        u.symbol
      from measurement.unit u;
    `,
    []
  )
}
