import * as jwt from 'jsonwebtoken'

import { User } from '@meta/user'

export const getAuthToken = ({ roles: _roles, ...user }: User): string => {
  return jwt.sign({ ...user }, process.env.TOKEN_SECRET)
}
