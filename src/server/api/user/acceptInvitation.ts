import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/role/props'
import { UserProps } from 'meta/user/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type Body = {
  user?: { props?: Partial<UserProps> }
  role?: { props?: UserRoleBaseProps | UserRoleExtendedProps }
}

export const acceptInvitation = async (
  req: CountryRequest<{ invitationUuid: string }, Body>,
  res: Response
): Promise<void> => {
  try {
    const { invitationUuid } = req.query
    const userProps = req.body?.user?.props
    const roleProps = req.body?.role?.props

    const { user, userInvitation } = await UserController.findByInvitation({ invitationUuid })

    const uuid = userInvitation.assessmentUuid
    const { cycleUuid } = userInvitation
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ uuid, cycleUuid })

    const acceptedUser = await UserController.acceptInvitation({
      assessment,
      cycle,
      user,
      userInvitation,
      userProps,
      roleProps,
    })

    Requests.sendOk(res, {
      user: acceptedUser,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
