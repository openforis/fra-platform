import { VerifyCallback } from 'passport-google-oauth20'

import { UserController } from 'server/controller/user'

type Props = {
  done: VerifyCallback
  email: string
}

export const googleLogin = async (props: Props): Promise<void> => {
  const { done, email } = props

  const user = await UserController.getOne({ emailGoogle: email })

  if (user) done(null, user)
  else done(null, false, { message: 'login.noMatchingProvider' })
}
