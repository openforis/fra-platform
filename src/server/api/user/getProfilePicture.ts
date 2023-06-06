import * as path from 'path'
import { Request, Response } from 'express'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getProfilePicture = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const profilePicture = await UserController.getProfilePicture({ id: Number(id) })
    if (profilePicture && profilePicture.data) {
      res.end(profilePicture.data, 'binary')
    } else {
      res.sendFile(path.resolve(__dirname, '..', '..', 'static', 'avatar.png'))
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
