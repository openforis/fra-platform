import { User } from 'meta/user'
import { UserProps } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db'

import { getOne } from './getOne'

type Props = { user: Partial<Omit<User, 'props'> & { props: Partial<UserProps> }> }

export const update = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { user } = props

  const values: Record<string, string | Partial<UserProps> | number> = { id: user.id }
  const setParts: Array<string> = []

  values.email = user.email
  setParts.push('email = $(email)')

  if (user.props) {
    values.props = user.props
    setParts.push('props = $(props)')
  }

  if (user.status) {
    values.status = user.status
    setParts.push('status = $(status)')
  }

  if (user.profilePictureFileUuid) {
    values.profilePictureFileUuid = user.profilePictureFileUuid
    setParts.push('profile_picture_file_uuid = $(profilePictureFileUuid)')
  }

  await client.one<User>(
    `
    update users set
    ${setParts.join(', ')}
    where id = $(id)
    returning *
    `,
    values
  )

  return getOne({ email: user.email, allowDisabled: true }, client)
}
