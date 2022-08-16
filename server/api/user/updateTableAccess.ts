import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const updateTableAccess = async (req: Request, res: Response) => {
  try {
    const { id, sections } = req.body

    await UserController.updateTableAccess({
      id,
      sections,
    })

    Requests.sendOk(res, null)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
