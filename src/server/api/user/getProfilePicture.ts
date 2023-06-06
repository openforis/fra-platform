import { Request, Response } from 'express'
import * as path from 'path'
import Requests from 'server/utils/requests'
import { UserController } from 'server/controller/user'

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
