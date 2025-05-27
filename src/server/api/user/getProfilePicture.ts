import { Request, Response } from 'express'

import { UserController } from 'server/controller/user'
import { FileStorage } from 'server/service/fileStorage'
import Requests from 'server/utils/requests'

export const getProfilePicture = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const profilePicture = await UserController.getProfilePicture({ id: Number(id) })
    if (profilePicture && profilePicture.data) {
      profilePicture.data.pipe(res)
    } else {
      const fileStream = await FileStorage.File.get({
        path: 'static/app',
        key: 'avatar.png',
      })
      fileStream.pipe(res)
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
