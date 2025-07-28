import { Response } from 'express'

import { UserEditRequest } from 'meta/api/request/user/edit'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const updateUser = async (req: UserEditRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const user = Requests.getUser(req)

    const userEditForm = req.body
    const profilePicture = req.file

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const updatedUser = await UserController.update({ assessment, cycle, profilePicture, user, userEditForm })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
