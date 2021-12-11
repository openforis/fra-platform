import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { Objects } from '@core/utils'

export const update = async (props: { user: User }, client: BaseProtocol = DB): Promise<User> => {
  const {
    user: { institution, lang, name, status, position, email, id },
  } = props

  return client.one<User>(
    `
        update users set
                      institution = $1,
                      lang = $2,
                      name = $3,
                      status = $4,
                      position = $5,
                      email = $6
        where id = $7
        returning *
    `,
    [institution, lang, name, status, position, email, id],
    Objects.camelize
  )
}
