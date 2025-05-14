import { Request, Response } from 'express'
import { Objects } from 'utils/objects'

import { AuthProvider, Users, UserStatus } from 'meta/user'

import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'
import { Requests } from 'server/utils'

export const postResetPassword = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, email } = req.body

    if (Objects.isEmpty(email?.trim())) return Requests.send400(res, 'login.emptyEmail')
    if (!Users.validEmail({ email })) return Requests.send400(res, 'login.invalidEmail')

    const user = await UserController.getOne({ email })
    if (!user) return Requests.send400(res, 'login.noMatchingEmail')
    if (user.status === UserStatus.invitationPending) return Requests.send400(res, 'login.noActiveAccount')

    const userProviders = await UserProviderController.getUserProviders({ user })
    if (userProviders.includes(AuthProvider.google) && !userProviders.includes(AuthProvider.local))
      return Requests.send400(res, 'login.googleOnlyAccount')

    const userResetPassword = await UserController.createResetPassword({ assessmentName, cycleName, user })
    if (userResetPassword) return Requests.sendOk(res, { message: 'login.passwordResetSent' })

    return Requests.send400(res, 'login.noMatchingEmail')
  } catch (err) {
    return Requests.sendErr(res, err)
  }
}
