import { User } from 'meta/user/user'

export const getFullName = (user: User): string => {
  return [user.props.name, user.props.surname].join(' ').trim()
}
