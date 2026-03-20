import { UUID } from 'meta/uuid/uuid'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  uuid: UUID
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { uuid } = props

  await client.query(`delete from users_role where uuid = $1`, [uuid])
}
