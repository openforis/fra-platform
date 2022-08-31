import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }

  try {
    const user = await UserController.getOne({ id: Number(id) })

    Requests.sendOk(res, user)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
