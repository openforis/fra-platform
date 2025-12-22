import { Request } from 'express'

import { passwordCompare, passwordHash } from 'server/api/auth/utils/passwordUtils'

export const getAndComparePasswordHash = async (props: { req: Request }): Promise<string | undefined> => {
  const { req } = props
  const { password, password2 } = req.body

  const passwordHashed = await passwordHash(password)
  const passwordMatch = await passwordCompare(password2, passwordHashed)

  if (passwordMatch) {
    return passwordHashed
  }
}
