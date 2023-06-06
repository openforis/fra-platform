import { Request, Response } from 'express'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const getResetPassword = async (req: Request<never, never, never, { resetPasswordUuid: string }>, res: Response) => {
  try {
    const { resetPasswordUuid } = req.query

    const { user, userResetPassword } = await UserController.findByResetPassword({ resetPasswordUuid })

    Requests.sendOk(res, { user, userResetPassword })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
