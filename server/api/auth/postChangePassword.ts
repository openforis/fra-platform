import { Response, Request } from 'express'
import { validPassword } from '@common/userUtils'
import { Requests } from '@server/utils'
import { Objects } from '@core/utils'
import { passwordHash } from '@server/api/auth/utils/passwordUtils'
import { UserController } from '@server/controller/user'

export const postChangePassword = async (req: Request, res: Response) => {
  try {
    const { email, password, uuid } = req.body

    if (Objects.isEmpty(password?.trim())) return Requests.send400(res, 'login.noEmptyPassword')
    if (!validPassword(password)) return Requests.send400(res, 'login.passwordError')

    const user = await UserController.getOne({ user: { email } })
    const hash = await passwordHash(password)
    const changed = await UserController.changePassword({
      email: user.email,
      password: hash,
      resetPasswordUuid: uuid,
    })
    if (changed) return Requests.sendOk(res, { message: 'login.passwordChanged' })
    return Requests.send400(res, 'login.noLongerValid')
  } catch (err) {
    return Requests.sendErr(res, err)
  }
}
