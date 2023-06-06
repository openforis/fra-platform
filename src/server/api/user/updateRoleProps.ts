import { Request, Response } from 'express'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const updateRoleProps = async (req: Request, res: Response) => {
  try {
    const { id, props } = req.body.role

    const userRole = await UserController.updateRoleProps({
      id,
      props,
    })

    Requests.sendOk(res, userRole)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
