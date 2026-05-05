import { Request, Response } from 'express'

import { UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/role/props'
import { UserProps } from 'meta/user/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type RequestBody = {
  invitationUuid: string
  roleProps?: UserRoleBaseProps | UserRoleExtendedProps
  userProps?: Pick<UserProps, 'name' | 'surname' | 'title'>
}

export const acceptInvitation = async (req: Request<never, never, RequestBody>, res: Response): Promise<void> => {
  try {
    const { invitationUuid, roleProps, userProps } = req.body

    const { user, userInvitation } = await UserController.findByInvitation({ invitationUuid })

    const uuid = userInvitation.assessmentUuid
    const { cycleUuid } = userInvitation
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ uuid, cycleUuid })

    const acceptedUser = await UserController.acceptInvitation({
      assessment,
      cycle,
      roleProps,
      user,
      userInvitation,
      userProps,
    })

    Requests.sendOk(res, { user: acceptedUser })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
